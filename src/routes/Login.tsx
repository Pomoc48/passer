import { FirebaseApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import { useState } from "react";
import Home from './Home';

function Login(params: { app: FirebaseApp }) {
  const [user, updateUser] = useState(null as UserCredential | null);

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  function sign() {
    signInWithPopup(auth, provider).then((result: UserCredential) => {
      updateUser(result);
    }).catch((error) => {
      alert(error.message);
    });
  }

  if (user === null) {
    return (
      <div className="Login">
        <button onClick={sign}>Google login</button>
      </div>
    )
  }

  return <Home app={params.app} user={user} />;
}

export default Login;
