import { EncryptedData } from "./EncryptedData";

export type SiteData = {
    uuid: string;
    name: EncryptedData;
    note: EncryptedData;
    password: EncryptedData;
    username: EncryptedData;
    url: EncryptedData;
}
