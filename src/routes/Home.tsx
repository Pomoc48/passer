import { FirebaseApp } from "firebase/app";
import { UserCredential } from "firebase/auth";
import '../css/Home.css';
import Marketing from "../widgets/Marketing";

function Home(params: { app: FirebaseApp, user: UserCredential | null, }) {
  return <div className="Home">
    {params.user === null ?
      <Marketing />
      : <div>Home</div>
    }
  </div>
}

export default Home;
