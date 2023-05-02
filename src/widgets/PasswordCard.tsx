import { useEffect, useState } from 'react';
import '../scss/widgets/PasswordCard.scss'
import { SiteData } from '../types/SiteData'
import { decrypt } from '../functions/Crypto';
import MaterialButton from '../components/button';

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
  
  return (
    <div className='PasswordCard'>
      <div className='Name'>{name}</div>
      <div className='Info'>
        <div>{url}</div>
        <div>{username}</div>
      </div>

      <div className='Actions'>
        <MaterialButton name='Visit' onClick={() => {}}/>
        <MaterialButton name='Copy' onClick={() => {}}/>
      </div>
    </div>
  );
}
