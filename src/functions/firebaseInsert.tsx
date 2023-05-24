import { DocumentReference, setDoc } from "firebase/firestore";
import { UploadData } from "../types/uploadData";
import ShortUniqueId from "short-unique-id";

export async function firebaseInsert(reference: DocumentReference, uploadData: UploadData) {
  const uid = new ShortUniqueId({ length: 12 });

  await setDoc(reference, {
    passwords: {
      [uid()]: {
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
