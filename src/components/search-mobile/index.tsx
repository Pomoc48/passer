import { UserCredential, getAuth, signOut } from 'firebase/auth';
import './style.css';
import { useEmailUser } from '../../context/userProvider';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/searchProvider';

export default function SearchMobile(params: { user: UserCredential }) {
  const auth = getAuth();
  const { update } = useEmailUser();
  const search = useSearch();

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
      <img className='clickable' onClick={signUserOut} src={image} draggable="false" alt="Profile" />
    </div>
  );
}
