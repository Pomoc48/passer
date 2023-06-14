import { UserCredential, getAuth, signOut } from 'firebase/auth';
import './style.css';
import { useGoogleUser } from '../../context/userProvider';
import { useNavigate } from 'react-router-dom';

export default function UserPill(params: { user: UserCredential }) {
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
    <div className="navbar-user pill clickable" onClick={signUserOut}>
      <img className='clickable' src={image} draggable="false" alt="Profile" />
      <p className='label-large'>{params.user.user.displayName}</p>
    </div>
  );
}
