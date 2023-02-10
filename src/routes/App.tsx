import { FirebaseApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential, signOut } from "firebase/auth";
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

  function out() {
    signOut(auth).then(() => {
      updateUser(null);
    }).catch((error) => {
      alert(error.message);
    });
  }

  return <>
    <TopBar user={user} signIn={signIn} signOut={out} />
    <Home app={params.app} user={user} />
  </>
}

export default App;
