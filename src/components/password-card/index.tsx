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
      className='card password-card'
      onClick={params.onClick}
    >
      <div className='content'>
        <p className='title'>{params.website.data.name}</p>
        <p className='url'>{url !== null ? url.host : "*no website"}</p>
        <p className='username'>
          {
            params.website.data.username
              ? params.website.data.username
              : "*no username"
          }
        </p>
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
          type='text'
        />
        <MaterialButton
          label='Options'
          onClick={() => { }}
          icon='settings'
          type='tonal'
        />
      </div>
    </div>
  );
}
