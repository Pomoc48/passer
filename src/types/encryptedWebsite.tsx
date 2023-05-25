import { Timestamp } from "firebase/firestore";
import { EncryptedData } from "./encryptedData";

export type EncryptedWebsite = {
    uuid: string;
    favorite: boolean;
    data: EncryptedData;
    time: {
        created: Timestamp;
        modified: Timestamp;
        used: Timestamp;
    };
}
