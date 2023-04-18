import { arrayUnion, DocumentReference, updateDoc } from "firebase/firestore"
import { Password } from "../types/Password";

export default function CreatePassword(params: {
  reference: DocumentReference,
  hasPasswords: boolean,
}) {

  const testPassword: Password = {
    name: "testPassword",
    password: "testPassword",
    note: "testPassword",
    username: "testPassword",
    website: "testPassword",
  }

  async function addPassword(password: Password) {
    if (params.hasPasswords) {
      await updateDoc(params.reference, {
        passwords: arrayUnion({
          name: password.name,
          password: password.password,
          note: password.note,
          username: password.username,
          website: password.website,
        }),
      });
    }
  }

  return (
    <div className='CreatePassword' onClick={async () => addPassword(testPassword)}>
      <p>Add new password</p>
    </div>
  );
}
