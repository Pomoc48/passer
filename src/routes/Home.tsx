import { FirebaseApp } from "firebase/app";
import { UserCredential } from "firebase/auth";

function Home(params: { app: FirebaseApp, user: UserCredential }) {
  console.log(params.user);

  return <>
    <p>{params.user.user.displayName}</p>
  </>
}

export default Home;
