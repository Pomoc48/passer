import { Website } from '../../types/website';
import MaterialButton from '../button';
import './style.css'

export default function PasswordCard(params: { website: Website, onClick: () => void }) {
  let url = params.website.data.url;

  if (url !== null) {
    try {
      url = new URL(url.toString());
    } catch (_) {
      url = null;
    }
  }

  let hasURL = url !== null;
  let hasUsername = params.website.data.username! !== "";

  return (
    <div
      className='card password-card'
      onClick={params.onClick}
    >
      <div className='content'>
        <p className='title'>{params.website.data.name}</p>
        <p className={hasURL ? 'url' : "url empty"}>
          {
            hasURL
              ? <a href={url!.toString()} target='_blank' rel="noreferrer">
                {url!.host}
                <span className="material-icons">open_in_new</span>
              </a>
              : "*no website"
          }
        </p>
        <p className={hasUsername ? 'username' : "username empty"}>
          {hasUsername ? params.website.data.username : "*no username"}
        </p>
      </div>
      <div className='actions'>
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
