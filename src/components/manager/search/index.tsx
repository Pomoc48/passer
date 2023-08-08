import { User, getAuth } from 'firebase/auth';
import { useSearch } from '../../../context/search';
import Avatar from '../../common/avatar';
import Pill from '../../common/pill';
import './style.scss';
import { useEmailUser } from '../../../context/user';
import { useNavigate } from 'react-router-dom';
import { signUserOut } from '../../../functions/auth';

export default function Search(params: { user: User }) {
  const auth = getAuth();
  const search = useSearch();
  const userContext = useEmailUser();

  const setUser = useEmailUser().update;
  const navigate = useNavigate();

  return (
    <>
      <Pill class='mobile-components'>
        <div className="pill-icon">
          <span className="material-icons">search</span>
        </div>
        <div>
          <input
            value={search.value}
            className='search-input mobile'
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
      <Pill class='desktop-components'>
        <div className="pill-icon">
          <span className="material-icons">search</span>
        </div>
        <div>
          <input
            value={search.value}
            className='search-input'
            placeholder='Search passwords…'
            onChange={e => search.update(e.target.value)}
          />
        </div>
      </Pill>
      <Pill
        class='desktop-components'
        onClick={() => signUserOut(auth, userContext.update, navigate)}
      >
        <Avatar user={params.user} />
        <p className='display-name'>{params.user.email!}</p>
      </Pill>
    </>


  );
}
