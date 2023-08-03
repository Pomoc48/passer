import { useSearch } from '../../../context/searchProvider';
import Pill from '../../common/pill';
import './style.scss';

export default function Search() {
  const search = useSearch();

  return (
    <Pill>
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

  );
}
