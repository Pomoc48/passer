import { User, getAuth } from 'firebase/auth';
import { useEmailUser } from '../../context/userProvider';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { signUserOut } from '../../functions/auth';

export default function UserPill(params: { user: User }) {
  const auth = getAuth();
  const setUser = useEmailUser().update;
  const navigate = useNavigate();

  return (
    <div
      className="navbar-user pill clickable"
      onClick={() => signUserOut(auth, setUser, navigate)}
    >
      {
        params.user.photoURL
          ? <img
            className='clickable'
            src={params.user.photoURL}
            draggable="false"
            alt="Profile"
          />
          : <div className="fake-photo">
            {params.user.email![0].toUpperCase()}
          </div>
      }
      <p className='label-large'>{params.user.email!}</p>
    </div>
  );
}
