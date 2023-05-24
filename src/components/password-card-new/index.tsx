import { DocumentReference } from "firebase/firestore"
import { encrypt } from "../../functions/crypto";
import { firebaseInsert } from "../../functions/firebaseInsert";
import { UploadData } from "../../types/uploadData";
import './style.css'

export default function CreatePassword(params: { reference: DocumentReference, cryptoKey: CryptoKey }) {

  async function prepareEncryptedData() {
    const password = await encrypt(params.cryptoKey, "testPassword");
    const name = await encrypt(params.cryptoKey, "testName");
    const note = await encrypt(params.cryptoKey, "testNote");
    const username = await encrypt(params.cryptoKey, "testUsername");

    const uploadData: UploadData = {
      name: name,
      password: password,
      note: note,
      username: username,
      url: new URL("https://mlukawski.com"),
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
