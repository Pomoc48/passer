import { Firestore, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import './style.scss'
import { createPortal } from 'react-dom';
import { SiteData } from '../../types/SiteData';
import { exportKey, generateKey, importKey } from '../../functions/Crypto';
import { testCaseMatch, updateTestCase } from '../../functions/PasswordTestCase';
import PasswordCard from '../../components/password-card';
import CreatePassword from '../../components/password-card-new';
import MaterialDialog from '../../components/dialog';
import Search from '../../components/search';
import { useGoogleUser } from '../../context/UserProvider';
import Navbar from '../../components/navbar';

export default function PasswordsPage(params: { db: Firestore }) {
  const user = useGoogleUser().user!;

  const [websites, updateWebsites] = useState<SiteData[]>([]);
  const docRef = doc(params.db, "passwords", user.user.uid);
  const [showModal, setShowModal] = useState(true);
  const [cryptoKey, setCryptoKey] = useState<CryptoKey | null>(null);

  const passwordRef = useRef<HTMLInputElement | null>(null);

  console.log("rerender");

  useEffect(() => {
    const keyData = localStorage.getItem("keyData");

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
        let passwords = doc.data().passwords;
        let newPasswords: SiteData[] = [];

        Object.keys(passwords).forEach(key => {
          newPasswords.push({
            uuid: key,
            name: {
              value: passwords[key].name.slice(24),
              iv: passwords[key].name.slice(0, 24),
            },
            note: {
              value: passwords[key].note.slice(24),
              iv: passwords[key].note.slice(0, 24),
            },
            password: {
              value: passwords[key].password.slice(24),
              iv: passwords[key].password.slice(0, 24),
            },
            username: {
              value: passwords[key].username.slice(24),
              iv: passwords[key].username.slice(0, 24),
            },
            url: {
              value: passwords[key].url.slice(24),
              iv: passwords[key].url.slice(0, 24),
            },
          });
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
        ? <div className='Passwords'>
            <CreatePassword reference={docRef} cryptoKey={cryptoKey} />
            { websites.map((website, index) => <PasswordCard key={index} website={website} cryptoKey={cryptoKey} />) }
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
            closeFunction={() => {}}
            actions={
              [{name: "Confirm", onClick: async () => {
                if (passwordRef.current === null) {
                  return;
                }

                if (passwordRef.current.value === "") {
                  return;
                }

                let key: CryptoKey = await generateKey(passwordRef.current.value);
                await updateTestCase(docRef, key);

                const keyData = await exportKey(key);
                localStorage.setItem("keyData", keyData)

                setCryptoKey(key);
                setShowModal(false);
              }}]
            }
          />,
          document.body
        )
        : null
    }
  </>
}
