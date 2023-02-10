import { FirebaseApp } from "firebase/app";
import { UserCredential } from "firebase/auth";
import '../css/Home.css';

function Home(params: { app: FirebaseApp, user: UserCredential | null, }) {
  return <div className="Home">
    {params.user === null ?
      <div>Please sign in</div>
      : <div>Home</div>
    }
  </div>
}

export default Home;
