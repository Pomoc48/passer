import { CollectionReference, doc, setDoc } from "firebase/firestore";
import { UploadData } from "../types/uploadData";

export async function firebaseInsert(reference: CollectionReference, uploadData: UploadData) {

  await setDoc(doc(reference, uploadData.uuid), {
    data: uploadData.websiteData,
    favorite: uploadData.favorite,
    time: {
      created: new Date(),
      modified: new Date(),
      used: new Date(),
    }
  }, { merge: true });
}
