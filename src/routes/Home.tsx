import { FirebaseApp } from "firebase/app";
import { GoogleAuthProvider, UserCredential } from "firebase/auth";
import { useLocation } from "react-router-dom";

function Home(params: { app: FirebaseApp }) {
    const user: UserCredential = useLocation().state;

    const credential = GoogleAuthProvider.credentialFromResult(user)

    if (credential == null) {
        return (
            <h2>Unauthenticated</h2>
        );
    }
    return (
        <h2>{credential?.accessToken}</h2>
    );
}

export default Home;
