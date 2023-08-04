import { CollectionReference, doc, setDoc, addDoc, deleteDoc, DocumentReference } from "firebase/firestore";
import { UploadData } from "../types/uploadData";

export async function dbInsert(reference: CollectionReference, uploadData: UploadData) {

    if (uploadData.uuid === null) {
        await addDoc(reference, {
            data: uploadData.websiteData,
            favorite: uploadData.favorite,
            time: {
                created: new Date(),
                modified: new Date(),
            }
        });

        return;
    }

    await setDoc(doc(reference, uploadData.uuid), {
        data: uploadData.websiteData,
        favorite: uploadData.favorite,
        time: {
            created: new Date(),
            modified: new Date(),
        }
    }, { merge: true });
}

export async function dbDelete(reference: DocumentReference) {
    await deleteDoc(reference);
}
