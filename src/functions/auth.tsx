import { Auth, User, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { generateKey, hashMessage } from "./crypto";
import { NavigateFunction } from "react-router-dom";
import { AuthFunctions } from "../types/authFunctions";

export const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function createKeyToken(pass: string, email: string): Promise<string> {
    return hashMessage(pass + email);
}

export async function autoLogin(functions: AuthFunctions) {
    let token = localStorage.getItem('keyToken');

    if (token === null) {
        return;
    }

    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            functions.setUser(auth.currentUser);
            functions.setCryptoKey(await generateKey(token!));

            functions.navigate("/manager");
            unsubscribe();
        }
    });
}

export async function logUserIn(
    email: string,
    password: string,
    functions: AuthFunctions,
): Promise<string | true> {
    let token = await createKeyToken(email, password);
    const auth = getAuth();

    let message: string | true = true;

    await signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {

            if (!userCredential.user.emailVerified) {
                message = "Please verify your e-mail address";
            } else {
                localStorage.setItem('keyToken', token);

                functions.setUser(userCredential.user);
                functions.setCryptoKey(await generateKey(token));

                functions.navigate("/manager");
            }
        })
        .catch((error) => message = error.message);

    return message;
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
