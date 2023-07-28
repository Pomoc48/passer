import { Timestamp } from "firebase/firestore";

export type EncryptedWebsite = {
    uuid: string;
    favorite: boolean;
    data: string;
    time: {
        created: Timestamp;
        modified: Timestamp;
    };
}
