import { Auth, User, getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { generateKey, hashMessage } from "./crypto";
import { NavigateFunction } from "react-router-dom";

export const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function passTransform(pass: string, email: string): Promise<string> {
    return hashMessage(pass + email);
}

export async function autoLogin(
    setUser: (user: User | null) => void,
    setCryptoKey: (user: CryptoKey | null) => void,
    navigate: NavigateFunction,
) {
    let token = localStorage.getItem('keyToken');

    if (token === null) {
        return;
    }

    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            setUser(auth.currentUser);
            setCryptoKey(await generateKey(token!));

            navigate("/manager");
            unsubscribe();
        }
    });
}

export function signUserOut(
    auth: Auth,
    setUser: (user: User | null) => void,
    navigate: NavigateFunction,
) {
    signOut(auth).then(() => {
        localStorage.removeItem('keyToken');

        setUser(null);
        navigate("/");
    });
}
