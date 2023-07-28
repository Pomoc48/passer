import { EncryptedData } from "../types/encryptedData";

export async function hashMessage(message: string): Promise<string> {
    const msgUint8 = new TextEncoder().encode(message + "h@v&b!/.9^fo%=");
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);

    return encodeHexString(hashBuffer);
}

export async function generateKey(password: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();

    return await crypto.subtle.importKey(
        "raw",
        encoder.encode(password).slice(0, 16),
        "AES-GCM",
        true,
        ["encrypt", "decrypt"],
    );
}

export async function encrypt(key: CryptoKey, message: string): Promise<string> {
    const encodedMessage = new TextEncoder().encode(message);
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encryptedBuffer = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv: iv },
        key,
        encodedMessage,
    );

    return encodeHexString(iv) + encodeHexString(encryptedBuffer);
}

export async function decrypt(key: CryptoKey, data: EncryptedData): Promise<string> {
    const decryptedBuffer = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv: decodeHexString(data.iv) },
        key,
        decodeHexString(data.data),
    );

    return new TextDecoder("utf-8").decode(decryptedBuffer);
}

function sliceIntoChunks(arr: string, chunkSize: number): string[] {
    const res = [];

    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }

    return res;
}

function decodeHexString(data: string): Uint8Array {
    const encryptedBuffer = sliceIntoChunks(data, 2);
    return new Uint8Array(encryptedBuffer.map((char) => parseInt(char, 16)));
}

function encodeHexString(data: ArrayBuffer): string {
    const hashArray = Array.from(new Uint8Array(data));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
