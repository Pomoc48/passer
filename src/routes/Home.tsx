import { FirebaseApp } from "firebase/app";
import { GoogleAuthProvider, UserCredential } from "firebase/auth";
import { useLocation } from "react-router-dom";

function Home(params: { app: FirebaseApp }) {
    const user: UserCredential = useLocation().state;
    // TODO: save user in function state
    // const credential = GoogleAuthProvider.credentialFromResult(user)

    // if (credential == null) {
    //     return (
    //         <h2>Unauthenticated</h2>
    //     );
    // }
    return (
        // <p>{credential?.accessToken}</p>
        <p>{user.user.displayName}</p>
    );
}

export default Home;
