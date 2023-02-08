import { OAuthCredential, UserCredential } from "firebase/auth";

export class AuthData {
    credential: OAuthCredential | null;
    result: UserCredential;

    constructor(credential: OAuthCredential | null, result: UserCredential) {
        this.credential = credential;
        this.result = result;
    }
}