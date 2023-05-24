import { DocumentReference, getDoc, setDoc } from "firebase/firestore";
import { decrypt, encrypt } from "./crypto";
import stringToEncType from "./stringToEnc";

export async function updateTestCase(reference: DocumentReference, key: CryptoKey) {
    let encrypted = await encrypt(key, "Test Message 123");

    await setDoc(reference, {
        keyTest: encrypted,
    }, { merge: true });
}

export async function testCaseMatch(reference: DocumentReference, key: CryptoKey) {
    const docSnap = await getDoc(reference);

    if (!docSnap.exists()) {
        localStorage.clear();
        return false;
    }

    if (docSnap.data().controlPassword !== undefined) {
        let controlString = docSnap.data().keyTest;

        const decrypted = await decrypt(
            key,
            stringToEncType(controlString),
        );

        if (decrypted === "Test Message 123") {
            return true;
        }
    }

    return false;
}
