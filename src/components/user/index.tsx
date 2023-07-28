import { UserCredential, getAuth } from 'firebase/auth';
import { useEmailUser } from '../../context/userProvider';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { signUserOut } from '../../functions/login';

export default function UserPill(params: { user: UserCredential }) {
  const auth = getAuth();
  const setUser = useEmailUser().update;
  const navigate = useNavigate();

  return (
    <div
      className="navbar-user pill clickable"
      onClick={() => signUserOut(auth, setUser, navigate)}
    >
      {
        params.user.user.photoURL
          ? <img
            className='clickable'
            src={params.user.user.photoURL}
            draggable="false"
            alt="Profile"
          />
          : <div className="fake-photo">
            {params.user.user.email![0].toUpperCase()}
          </div>
      }
      <p className='label-large'>{params.user.user.email!}</p>
    </div>
  );
}
