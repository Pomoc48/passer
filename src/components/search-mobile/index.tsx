import { User, getAuth } from 'firebase/auth';
import './style.css';
import { useEmailUser } from '../../context/userProvider';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/searchProvider';
import { signUserOut } from '../../functions/auth';

export default function SearchMobile(params: { user: User }) {
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
          params.user.photoURL
            ? <img
              src={params.user.photoURL}
              draggable="false"
              alt="Profile"
            />
            : <div className="fake-photo">
              {params.user.email![0].toUpperCase()}
            </div>
        }
      </div>
    </div>
  );
}
