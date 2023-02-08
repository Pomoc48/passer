import { FirebaseApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login(params: { app: FirebaseApp }) {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const navigate = useNavigate();

    function sign() {
        signInWithPopup(auth, provider).then((result: UserCredential) => {
            navigate("/home", { state: result });
        }).catch((error) => {
            alert(error.message);
        });
    }

    return (
        <div className="Login">
            <button onClick={sign}>Google login</button>
        </div>
    );
}

export default Login;
