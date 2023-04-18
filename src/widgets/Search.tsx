import { UserCredential } from 'firebase/auth';
import '../scss/widgets/Search.scss';

export default function Search(params: { user: UserCredential, signOut: () => void }) {

  let image: string | undefined;

  if (params.user.user.photoURL === null) {
    image = undefined;
  } else {
    image = params.user.user.photoURL;
  }

  return (
    <div className="Search">
      <span className="material-icons">search</span>
      <div>
        <input placeholder='Search passwords' />
      </div>
      <img onClick={params.signOut} src={image} draggable="false" alt="Profile" />
    </div>
  );
}
