import { UserCredential, getAuth, signOut } from 'firebase/auth';
import { useEmailUser } from '../../context/userProvider';
import { useNavigate } from 'react-router-dom';
import './style.css';

export default function UserPill(params: { user: UserCredential }) {
  const auth = getAuth();
  const { update } = useEmailUser();

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
