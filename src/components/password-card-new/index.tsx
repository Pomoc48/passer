import { DocumentReference } from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from "../../functions/Crypto";
import { SiteData } from "../../types/SiteData";
import { insertWebsite } from "../../functions/InsertWebsite";
import './style.css'

export default function CreatePassword(params: {reference: DocumentReference, cryptoKey: CryptoKey}) {

  async function prepareEncryptedData() {
    const password = await encrypt(params.cryptoKey, "testPassword");
    const name = await encrypt(params.cryptoKey, "testName");
    const note = await encrypt(params.cryptoKey, "testNote");
    const username = await encrypt(params.cryptoKey, "testUsername");
    const url = await encrypt(params.cryptoKey, "testUrl");

    const testPassword: SiteData = {
      uuid: uuidv4(),
      date: new Date(),
      name: name,
      password: password,
      note: note,
      username: username,
      url: url,
    }

    await insertWebsite(params.reference, testPassword);
  }

  return (
    <div className='card create-password title-large clickable' onClick={prepareEncryptedData}>
      <span className="material-icons">add</span>
      <p>New Password</p>
    </div>
  );
}
