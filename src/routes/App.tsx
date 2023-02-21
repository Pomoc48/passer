import { FirebaseApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential, signOut } from "firebase/auth";
import { useState } from "react";
import Home from './Home';
import "../scss/App.scss";
import TopBar from "../widgets/TopBar";

function App(params: { app: FirebaseApp }) {
  const [user, updateUser] = useState(null as UserCredential | null);

  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const db = getFirestore(params.app);

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

  return <div className="App">
    <TopBar user={user} signIn={signIn} signOut={out} />
    <Home db={db} user={user} />
  </div>
}

export default App;
