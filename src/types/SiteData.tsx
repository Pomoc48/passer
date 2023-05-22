import { Timestamp } from "firebase/firestore";
import { EncryptedData } from "./EncryptedData";

export type SiteData = {
    uuid: string;
    date: Date | Timestamp;
    name: EncryptedData;
    note: EncryptedData;
    password: EncryptedData;
    username: EncryptedData;
    url: EncryptedData;
}
