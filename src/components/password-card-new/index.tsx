import { CollectionReference } from "firebase/firestore"
import { encrypt } from "../../functions/crypto";
import { firebaseInsert } from "../../functions/firebaseInsert";
import { UploadData } from "../../types/uploadData";
import ShortUniqueId from "short-unique-id";
import './style.css'
import { useCryptoKey } from "../../context/cryptoKey";

export default function CreatePassword(params: { reference: CollectionReference }) {
  const cryptoKey = useCryptoKey().key!;

  async function prepareEncryptedData() {
    const uid = new ShortUniqueId({ length: 16 });

    const data = {
      name: "My Website",
      note: "testNote",
      password: "testPassword",
      url: "https://mlukawski.com",
      username: "testUsername",
    };

    const serialized = JSON.stringify(data);
    const encrypted = await encrypt(cryptoKey, serialized);

    const uploadData: UploadData = {
      uuid: uid(),
      websiteData: encrypted,
      favorite: false,
      time: {
        created: new Date(),
        modified: new Date(),
        used: new Date(),
      }
    }

    await firebaseInsert(params.reference, uploadData);
  }

  return (
    <div className='card create-password title-large clickable' onClick={prepareEncryptedData}>
      <span className="material-icons">add</span>
      <p>New Password</p>
    </div>
  );
}
