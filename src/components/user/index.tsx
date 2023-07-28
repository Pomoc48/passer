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

  return (
    <div className="navbar-user pill clickable" onClick={signUserOut}>
      {
        params.user.user.photoURL
          ? <img className='clickable' src={params.user.user.photoURL} draggable="false" alt="Profile" />
          : <div className="fake-photo">{params.user.user.email![0].toUpperCase()}</div>
      }
      <p className='label-large'>{params.user.user.email!}</p>
    </div>
  );
}
