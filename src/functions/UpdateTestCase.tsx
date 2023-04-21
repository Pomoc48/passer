import { DocumentReference, setDoc } from "firebase/firestore";

export async function updateTestCase(reference: DocumentReference, encryptedValue: string) {
  await setDoc(reference, {
    testValue: encryptedValue,
  }, { merge: true });
}
