import { Timestamp } from "firebase/firestore";
import { SiteData } from "./siteData";
import { decrypt } from "../functions/crypto";
import stringToEncType from "../functions/stringToEnc";

export default class EncryptedSiteData {
    key: CryptoKey;
    uuid: string;
    date: Date;
    name: string;
    note: string;
    password: string;
    url: string;
    username: string;

    constructor(
        key: CryptoKey,
        uuid: string,
        date: Timestamp,
        name: string,
        note: string,
        password: string,
        url: string,
        username: string,
    ) {
        this.key = key;
        this.uuid = uuid;
        this.date = date.toDate();
        this.name = name;
        this.note = note;
        this.password = password;
        this.url = url;
        this.username = username;
    }

    async decrypt(): Promise<SiteData> {

        let decryptLocal = async (value: string | null) => {
            if (value === null) {
                return null;
            }

            return await decrypt(
                this.key,
                stringToEncType(value)
            );
        };

        let url: URL | null;

        try {
            url = new URL(this.url!);
        } catch (e) {
            url = null;
        }

        return {
            uuid: this.uuid,
            date: this.date,
            name: (await decryptLocal(this.name))!,
            note: await decryptLocal(this.note),
            password: await decryptLocal(this.password),
            url: url,
            username: await decryptLocal(this.username),
        }
    }
}
