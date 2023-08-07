import { User, getAuth } from 'firebase/auth';
import './style.scss';
import { useEmailUser } from '../../../context/user';
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../../context/search';
import { signUserOut } from '../../../functions/auth';
import Avatar from '../../common/avatar';
import Pill from '../../common/pill';

export default function SearchMobile(params: { user: User }) {
  const auth = getAuth();
  const search = useSearch();

  const setUser = useEmailUser().update;
  const navigate = useNavigate();

  return (
    <Pill>
      <div className="pill-icon">
        <span className="material-icons">search</span>
      </div>
      <div>
        <input
          value={search.value}
          className='search-input-mobile'
          placeholder='Search passwords…'
          onChange={e => search.update(e.target.value)}
        />
      </div>
      <div
        className='clickable'
        onClick={() => signUserOut(auth, setUser, navigate)}
      >
        <Avatar user={params.user} />
      </div>
    </Pill>
  );
}
