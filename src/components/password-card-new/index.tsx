import { DocumentReference } from "firebase/firestore"
import { v4 as uuidv4 } from 'uuid';
import { encrypt } from "../../functions/Crypto";
import { SiteData } from "../../types/SiteData";
import { insertWebsite } from "../../functions/InsertWebsite";

export default function CreatePassword(params: {reference: DocumentReference, cryptoKey: CryptoKey}) {

  async function prepareEncryptedData() {
    const password = await encrypt(params.cryptoKey, "testPassword");
    const name = await encrypt(params.cryptoKey, "testName");
    const note = await encrypt(params.cryptoKey, "testNote");
    const username = await encrypt(params.cryptoKey, "testUsername");
    const url = await encrypt(params.cryptoKey, "testUrl");

    const testPassword: SiteData = {
      uuid: uuidv4(),
      name: name,
      password: password,
      note: note,
      username: username,
      url: url,
    }

    await insertWebsite(params.reference, testPassword);
  }

  return (
    <div className='CreatePassword' onClick={prepareEncryptedData}>
      <p>Add new password</p>
    </div>
  );
}
