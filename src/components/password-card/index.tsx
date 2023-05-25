import { useEffect, useState } from 'react';
import { EncryptedWebsite } from '../../types/encryptedWebsite';
import { useCryptoKey } from '../../context/cryptoKey';
import { decrypt } from '../../functions/crypto';
import './style.css'
import { Website } from '../../types/website';
import { EncryptedData } from '../../types/encryptedData';

export default function PasswordCard(params: { website: EncryptedWebsite }) {
  const cryptoKey = useCryptoKey().key!;

  const [website, setWebsite] = useState<Website | null>(null);

  useEffect(() => {
    performDecryption();

    async function performDecryption() {
      const decrypted = await decrypt(cryptoKey, new EncryptedData(params.website.data));

      let website: Website = {
        data: JSON.parse(decrypted),
        uuid: params.website.uuid,
        favorite: params.website.favorite,
        time: {
          created: params.website.time.created.toDate(),
          modified: params.website.time.modified.toDate(),
          used: params.website.time.used.toDate(),
        }
      }

      setWebsite(website);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (website === null) {
    return (
      <div className="card" />
    )
  }

  return (
    <div className='card password-card clickable'>
      <div>
        <h2 className='title-large'>{website.data.name}</h2>
        <p className='body-medium'>{website.data.url?.toString()}</p>
        <p className='body-medium'>{website.data.username}</p>
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
