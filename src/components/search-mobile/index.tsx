import { UserCredential, getAuth } from 'firebase/auth';
import './style.css';
import { useEmailUser } from '../../context/userProvider';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/searchProvider';
import { signUserOut } from '../../functions/login';

export default function SearchMobile(params: { user: UserCredential }) {
  const auth = getAuth();
  const search = useSearch();

  const setUser = useEmailUser().update;
  const navigate = useNavigate();

  return (
    <div className="search-mobile pill">
      <span className="material-icons">search</span>
      <div>
        <input
          value={search.value}
          className='body-medium'
          placeholder='Search passwords…'
          onChange={e => search.update(e.target.value)}
        />
      </div>
      <div
        className='clickable'
        onClick={() => signUserOut(auth, setUser, navigate)}
      >
        {
          params.user.user.photoURL
            ? <img
              src={params.user.user.photoURL}
              draggable="false"
              alt="Profile"
            />
            : <div className="fake-photo">
              {params.user.user.email![0].toUpperCase()}
            </div>
        }
      </div>
    </div>
  );
}
