export class EncryptedData {
    data: string;
    iv: string;

    constructor(value: string) {
        this.data = value.slice(24);
        this.iv = value.slice(0, 24);
    }
}
