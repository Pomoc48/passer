import { CollectionReference, doc, setDoc, addDoc, deleteDoc, DocumentReference } from "firebase/firestore";
import { UploadData } from "../types/uploadData";

export async function dbInsert(
    reference: CollectionReference,
    uploadData: UploadData
) {
    await addDoc(reference, {
        data: uploadData.websiteData,
        favorite: uploadData.favorite,
        time: {
            created: uploadData.time.created,
            modified: uploadData.time.modified,
        }
    });
}

export async function dbUpdate(
    reference: CollectionReference,
    uploadData: UploadData
) {
    await setDoc(doc(reference, uploadData.uuid!), {
        data: uploadData.websiteData,
        favorite: uploadData.favorite,
        time: {
            created: uploadData.time.created,
            modified: uploadData.time.modified,
        }
    }, { merge: true });
}

export async function dbDelete(reference: DocumentReference) {
    await deleteDoc(reference);
}

export async function dbFavorite(
    reference: CollectionReference,
    uuid: string,
    favorite: boolean
) {
    await setDoc(doc(reference, uuid), {
        favorite: favorite,
    }, { merge: true });
}
