import { Website } from '../../types/website';
import MaterialButton from '../button';
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
            : <MaterialButton
              label='Visit'
              onClick={() => window.open(url!)}
              icon='open_in_new'
              type='text'
            />
        }
        <MaterialButton
          label='Copy'
          onClick={() => { }}
          icon='content_copy'
        />
      </div>
    </div>
  );
}
