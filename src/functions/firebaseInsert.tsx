import { DocumentReference, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { UploadData } from "../types/uploadData";

export async function firebaseInsert(reference: DocumentReference, uploadData: UploadData) {
  await setDoc(reference, {
    passwords: {
      [uuidv4()]: {
        name: uploadData.name,
        date: new Date(),
        password: uploadData.password,
        note: uploadData.note,
        username: uploadData.username,
        url: uploadData.url === null ? null : uploadData.url.toString(),
      }
    },
  }, { merge: true });
}
