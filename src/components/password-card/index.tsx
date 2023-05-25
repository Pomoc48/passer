import { Website } from '../../types/website';
import './style.css'

export default function PasswordCard(params: { website: Website }) {
  if (params.website === null) {
    return (
      <div className="card" />
    )
  }

  return (
    <div className='card password-card clickable'>
      <div>
        <h2 className='title-large'>{params.website.data.name}</h2>
        <p className='body-medium'>{params.website.data.url?.toString()}</p>
        <p className='body-medium'>{params.website.data.username}</p>
      </div>
      <div className='actions'>
        {
          params.website.data.url === null
            ? null
            : <button type='button' className='text icon label-large clickable' onClick={() => {
              window.open(params.website.data.url!);
            }}>
              <span className="material-icons">open_in_new</span>
              Visit
            </button>
        }
        <button type='button' className='icon label-large clickable' onClick={() => { }}>
          <span className="material-icons">content_copy</span>
          Copy
        </button>
      </div>
    </div>
  );
}
