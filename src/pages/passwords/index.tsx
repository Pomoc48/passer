import { Firestore, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import './style.css'
import { createPortal } from 'react-dom';
import EncryptedSiteData from '../../types/encryptedSiteData';
import { exportKey, generateKey, importKey } from '../../functions/crypto';
import { testCaseMatch, updateTestCase } from '../../functions/passwordTestCase';
import PasswordCard from '../../components/password-card';
import CreatePassword from '../../components/password-card-new';
import MaterialDialog from '../../components/dialog';
import Search from '../../components/search';
import { useGoogleUser } from '../../context/userProvider';
import Navbar from '../../components/navbar';

export default function PasswordsPage(params: { db: Firestore }) {
  const user = useGoogleUser().user!;

  const [websites, updateWebsites] = useState<EncryptedSiteData[]>([]);
  const docRef = doc(params.db, "passwords", user.user.uid);
  const [showModal, setShowModal] = useState(true);
  const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);

  const passwordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const keyData = localStorage.getItem(user.user.uid);

    if (keyData !== null) {
      validateKey(keyData);
    }

    async function validateKey(keyData: string) {
      let key: CryptoKey = await importKey(keyData);

      if (await testCaseMatch(docRef!, key)) {
        setCryptoKey(key);
        setShowModal(false);
      } else {
        setCryptoKey(null);
        setShowModal(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cryptoKey === null) {
      return;
    }

    onSnapshot(docRef!, (doc) => {
      if (doc.exists() && doc.data().passwords !== undefined) {
        let pData = doc.data().passwords;
        let newPasswords: EncryptedSiteData[] = [];

        Object.keys(pData).forEach(key => {
          newPasswords.push(new EncryptedSiteData(
            cryptoKey,
            key,
            pData[key].date,
            pData[key].name,
            pData[key].note,
            pData[key].password,
            pData[key].url,
            pData[key].username,
          ));
        });

        updateWebsites(newPasswords);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cryptoKey]);

  return <>
    <Navbar>
      <Search user={user} />
    </Navbar>
    {
      cryptoKey !== null
        ? <div className='passwords'>
          <CreatePassword reference={docRef} cryptoKey={cryptoKey} />
          {websites.map((data, index) => <PasswordCard key={index} encryptedData={data} />)}
        </div>
        : null
    }
    {
      showModal
        ? createPortal(
          <MaterialDialog
            title="Master password setup"
            content={
              <>
                <div>Please enter your master password used for encrypting and decrypting your data.</div>
                <input
                  type='password'
                  className='DialogInput'
                  placeholder='SecretPassword123'
                  ref={passwordRef}
                />
              </>
            }
            closeFunction={() => { }}
            actions={
              [{
                name: "Confirm", onClick: async () => {
                  if (passwordRef.current === null) {
                    return;
                  }

                  if (passwordRef.current.value === "") {
                    return;
                  }

                  let key: CryptoKey = await generateKey(passwordRef.current.value);
                  await updateTestCase(docRef, key);

                  const keyData = await exportKey(key);
                  localStorage.setItem(user.user.uid, keyData)

                  setCryptoKey(key);
                  setShowModal(false);
                }
              }]
            }
          />,
          document.body
        )
        : null
    }
  </>
}
