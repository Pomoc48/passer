import { DocumentReference, getDoc, setDoc } from "firebase/firestore";
import { decrypt, encrypt } from "./crypto";
import { EncryptedData } from "../types/EncryptedData";

export async function updateTestCase(reference: DocumentReference, key: CryptoKey) {
    let encrypted = await encrypt(key, "Test Message");

    await setDoc(reference, {
        controlPassword: {
            password: encrypted.value,
            iv: encrypted.iv,
        },
    }, { merge: true });
}

export async function testCaseMatch(reference: DocumentReference, key: CryptoKey) {
    const docSnap = await getDoc(reference);

    if (!docSnap.exists()) {
        localStorage.clear();
        return false;
    }

    if (docSnap.data().controlPassword !== undefined) {
        let encryptedData: EncryptedData = {
            value: docSnap.data().controlPassword["password"],
            iv: docSnap.data().controlPassword["iv"],
        }

        const decrypted = await decrypt(
            key,
            encryptedData.value,
            encryptedData.iv,
        );

        if (decrypted === "Test Message") {
            return true;
        }
    }

    return false;
}
