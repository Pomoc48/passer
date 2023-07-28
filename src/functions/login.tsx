import { Auth, UserCredential, signOut } from "firebase/auth";
import { hashMessage } from "./crypto";
import { NavigateFunction } from "react-router-dom";

export const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function passTransform(pass: string, email: string): Promise<string> {
    return hashMessage(pass + email);
}

export function signUserOut(
    auth: Auth,
    setUser: (user: UserCredential | null) => void,
    navigate: NavigateFunction,
) {
    signOut(auth).then(() => {
        localStorage.removeItem("userEmail");
        localStorage.removeItem('userToken');

        setUser(null);
        navigate("/");
    });
}
