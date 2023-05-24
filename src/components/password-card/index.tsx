import { useEffect, useState } from 'react';
import EncryptedSiteData from '../../types/encryptedSiteData';
import './style.css'

export default function PasswordCard(params: { encryptedData: EncryptedSiteData }) {
  const [name, setName] = useState("…");
  const [url, setUrl] = useState("…");
  const [username, setUsername] = useState("…");

  useEffect(() => {
    performDecryption();

    async function performDecryption() {
      let siteData = await params.encryptedData.decrypt();

      setName(siteData.name);
      setUrl(siteData.url === null ? "" : siteData.url.toString());
      setUsername(siteData.username === null ? "" : siteData.username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='card password-card clickable'>
      <div>
        <h2 className='title-large'>{name}</h2>
        <p className='body-medium'>{url}<br />{username}</p>
      </div>
      <div className='actions'>
        <button type='button' className='text icon label-large clickable' onClick={() => { }}>
          <span className="material-icons">open_in_new</span>
          Visit
        </button>
        <button type='button' className='icon label-large clickable' onClick={() => { }}>
          <span className="material-icons">content_copy</span>
          Copy
        </button>
      </div>
    </div>
  );
}
