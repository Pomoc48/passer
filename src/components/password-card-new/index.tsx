import { CollectionReference } from "firebase/firestore"
import { encrypt } from "../../functions/crypto";
import { firebaseInsert } from "../../functions/firebaseInsert";
import { UploadData } from "../../types/uploadData";
import ShortUniqueId from "short-unique-id";
import './style.css'

export default function CreatePassword(params: { reference: CollectionReference, cryptoKey: CryptoKey }) {

  async function prepareEncryptedData() {
    const uid = new ShortUniqueId({ length: 16 });

    const data = {
      name: "testName",
      note: "testNote",
      password: "testPassword",
      url: "http://localhost:3000",
      username: "testUsername",
    };

    const serialized = JSON.stringify(data);
    const encrypted = await encrypt(params.cryptoKey, serialized);

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
