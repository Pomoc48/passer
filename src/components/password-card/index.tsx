import { useEffect, useState } from 'react';
import './style.css'
import { SiteData } from '../../types/SiteData';
import { decrypt } from '../../functions/crypto';
// import { Timestamp } from 'firebase/firestore';

export default function PasswordCard(params: {website: SiteData, cryptoKey: CryptoKey}) {
  const [name, setName] = useState("?");
  const [url, setUrl] = useState("?");
  const [username, setUsername] = useState("?");

  useEffect(() => {
    performDecryption();

    async function performDecryption() {
      const name = await decrypt(
        params.cryptoKey,
        params.website.name.value,
        params.website.name.iv,
      );

      const url = await decrypt(
        params.cryptoKey,
        params.website.url.value,
        params.website.url.iv,
      );

      const username = await decrypt(
        params.cryptoKey,
        params.website.username.value,
        params.website.username.iv,
      );

      setName(name);
      setUrl(url);
      setUsername(username);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  // console.log(
  //   (params.website.date as Timestamp).toDate().toLocaleString()
  // );
  
  return (
    <div className='card password-card clickable'>
      <div>
        <h2 className='title-large'>{name}</h2>
        <p className='body-medium'>{url}<br/>{username}</p>
      </div>
      <div className='actions'>
        <button type='button' className='text icon label-large clickable' onClick={() => {}}>
          <span className="material-icons">open_in_new</span>
          Visit
        </button>
        <button type='button' className='icon label-large clickable' onClick={() => {}}>
          <span className="material-icons">content_copy</span>
          Copy
        </button>
      </div>
    </div>
  );
}
