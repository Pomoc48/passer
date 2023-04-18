import { DocumentReference } from "firebase/firestore"
import { SiteData } from "../types/SiteData";
import { insertWebsite } from "../functions/InsertWebsite";
import { v4 as uuidv4 } from 'uuid';

export default function CreatePassword(params: {reference: DocumentReference}) {

  const testPassword: SiteData = {
    uuid : uuidv4(),
    name: "testPassword",
    password: "testPassword",
    note: "testPassword",
    username: "testPassword",
    url: "testPassword",
  }

  return (
    <div className='CreatePassword' onClick={async () => insertWebsite(params.reference, testPassword)}>
      <p>Add new password</p>
    </div>
  );
}
