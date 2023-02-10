import { UserCredential } from "firebase/auth";
import { Firestore } from "firebase/firestore";
import '../css/Home.css';
import Marketing from "../widgets/Marketing";
import Passwords from "../widgets/Passwords";

function Home(params: { db: Firestore, user: UserCredential | null, }) {
  return <div className="Home">
    {params.user === null ? <Marketing /> : <Passwords db={params.db} user={params.user} />}
  </div>
}

export default Home;
