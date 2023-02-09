import { FirebaseApp } from "firebase/app";
import { UserCredential } from "firebase/auth";

function Home(params: { app: FirebaseApp, user: UserCredential }) {

  let image: string | undefined;

  if (params.user.user.photoURL === null) {
    image = undefined;
  } else {
    image = params.user.user.photoURL;
    console.log(image);
  }

  return <>
    <p>{params.user.user.displayName}</p>
    <img src={image} alt="Profile" />
  </>
}

export default Home;
