import { User } from "firebase/auth";
import { NavigateFunction } from "react-router-dom";

export type AuthFunctions = {
    setUser: (user: User | null) => void,
    setCryptoKey: (user: CryptoKey | null) => void,
    navigate: NavigateFunction,
}
