import { User } from 'firebase/auth';
import { useSearch } from '../../../context/search';
import Avatar from '../../common/avatar';
import Pill from '../../common/pill';
import './style.scss';

export default function Search(
  params: {
    user: User,
    openDialog: () => void,
  }
) {
  const search = useSearch();

  return (
    <>
      <Pill class='mobile-components'>
        <div className="pill-icon">
          <span className="material-symbols-outlined">search</span>
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
          onClick={params.openDialog}
        >
          <Avatar user={params.user} />
        </div>
      </Pill>
      <Pill class='desktop-components'>
        <div className="pill-icon">
          <span className="material-symbols-outlined">search</span>
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
        onClick={params.openDialog}
      >
        <Avatar user={params.user} />
        <p className='display-name'>
          {
            params.user.displayName === null
              ? params.user.email
              : params.user.displayName
          }
        </p>
      </Pill>
    </>
  );
}
