import { FirebaseApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import { useState } from "react";
import Home from './Home';
import "../css/App.css";
import TopBar from "../widgets/TopBar";

function App(params: { app: FirebaseApp }) {
  const [user, updateUser] = useState(null as UserCredential | null);

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  function signIn() {
    signInWithPopup(auth, provider).then((result: UserCredential) => {
      updateUser(result);
    }).catch((error) => {
      alert(error.message);
    });
  }

  function signOut() {

  }

  return <>
    <TopBar user={user} signIn={signIn} signOut={signOut} />
    <Home app={params.app} />
  </>
}

export default App;
