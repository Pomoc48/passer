import { useSearch } from '../../context/searchProvider';
import './style.css';

export default function Search() {
  const search = useSearch();

  return (
    <div className="search pill">
      <span className="material-icons">search</span>
      <div>
        <input
          value={search.value}
          className='body-medium'
          placeholder='Search passwords'
          onChange={e => search.update(e.target.value)}
        />
      </div>
    </div>
  );
}
