import { Website } from '../../types/website';
import './style.css'

export default function PasswordCard(params: { website: Website, onClick: () => void }) {
  if (params.website === null) {
    return (
      <div className="card" />
    )
  }

  let url = params.website.data.url;

  if (url !== null) {
    try {
      url = new URL(url.toString());
    } catch (_) {
      url = null;
    }
  }

  return (
    <div
      className='card password-card clickable'
      onClick={params.onClick}
    >
      <div>
        <h2 className='title-large'>{params.website.data.name}</h2>
        {
          url !== null
            ? <p className='body-medium'>{url.host}</p>
            : null
        }
        <p className='body-medium'>{params.website.data.username}</p>
      </div>
      <div className='actions'>
        {
          url === null
            ? null
            : <button
              type='button'
              className='text icon label-large clickable'
              onClick={() => window.open(url!)}
            >
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
