import { FirebaseApp } from "firebase/app";
import { UserCredential } from "firebase/auth";

function Home(params: { app: FirebaseApp, user: UserCredential }) {
  return (
    <p>{params.user.user.displayName}</p>
  );
}

export default Home;
