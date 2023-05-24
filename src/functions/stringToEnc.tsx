import { EncryptedData } from "../types/encryptedData";

export default function stringToEncType(value: string): EncryptedData {
    return {
        data: value.slice(24),
        iv: value.slice(0, 24),
    }
}
