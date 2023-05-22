import { UserCredential, getAuth, signOut } from 'firebase/auth';
import './style.scss';
import { useGoogleUser } from '../../context/UserProvider';
import { useNavigate } from 'react-router-dom';

export default function Search(params: {user: UserCredential}) {
  const auth = getAuth();
  const { update } = useGoogleUser();

  const navigate = useNavigate();

  function signUserOut() {
    signOut(auth).then(() => {
      update(null);
      navigate("/");
    }).catch((error) => {
      alert(error.message);
    });
  }

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
      <img onClick={signUserOut} src={image} draggable="false" alt="Profile" />
    </div>
  );
}