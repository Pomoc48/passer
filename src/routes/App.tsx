import { FirebaseApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import { useState } from "react";
import Home from './Home';
import GoogleButton from "../widgets/GoogleButton";

function App(params: { app: FirebaseApp }) {
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
    return <div className="App">
      <h1>Welcome</h1>
      <GoogleButton onclick={sign} />
    </div>
  }

  return <Home app={params.app} user={user} />;
}

export default App;
