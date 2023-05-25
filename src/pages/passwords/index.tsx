import { Firestore, collection, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import './style.css'
import { createPortal } from 'react-dom';
import { decrypt, exportKey, generateKey, importKey } from '../../functions/crypto';
import { testCaseMatch, updateTestCase } from '../../functions/passwordTestCase';
import PasswordCard from '../../components/password-card';
import CreatePassword from '../../components/password-card-new';
import MaterialDialog from '../../components/dialog';
import Search from '../../components/search';
import { useGoogleUser } from '../../context/userProvider';
import Navbar from '../../components/navbar';
import { useCryptoKey } from '../../context/cryptoKey';
import { Website } from '../../types/website';
import { EncryptedData } from '../../types/encryptedData';

export default function PasswordsPage(params: { db: Firestore }) {
  const user = useGoogleUser().user!;
  const cryptoKey = useCryptoKey();

  const [websites, updateWebsites] = useState<Website[]>([]);
  const [showModal, setShowModal] = useState(true);

  const passwordRef = useRef<HTMLInputElement | null>(null);

  const userDocRef = doc(params.db, "users", user.user.uid);
  const websitesColRef = collection(params.db, "users", user.user.uid, "websites");

  useEffect(() => {
    const keyData = localStorage.getItem(user.user.uid);

    if (keyData !== null) {
      validateKey(keyData);
    }

    async function validateKey(keyData: string) {
      let key: CryptoKey = await importKey(keyData);

      if (await testCaseMatch(userDocRef!, key)) {
        cryptoKey.update(key);
        setShowModal(false);
      } else {
        cryptoKey.update(null);
        setShowModal(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cryptoKey.key === null) {
      return;
    }

    let websites: Website[] = [];

    onSnapshot(websitesColRef, (snapshot) => {
      snapshot.forEach(async (doc) => {
        const decrypted = await decrypt(cryptoKey.key!, new EncryptedData(doc.data().data));

        let website: Website = {
          uuid: doc.id,
          data: JSON.parse(decrypted),
          favorite: doc.data().favorite,
          time: {
            created: doc.data().time.created.toDate(),
            modified: doc.data().time.modified.toDate(),
            used: doc.data().time.used.toDate(),
          }
        }

        websites.push(website);
      });

      updateWebsites(websites);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cryptoKey.key]);

  return <>
    <Navbar>
      <Search user={user} />
    </Navbar>
    {
      cryptoKey.key !== null
        ? <div className='passwords'>
          <CreatePassword reference={websitesColRef} />
          {websites.map((data, index) => <PasswordCard key={index} website={data} />)}
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
                  await updateTestCase(userDocRef, key);

                  const keyData = await exportKey(key);
                  localStorage.setItem(user.user.uid, keyData)

                  cryptoKey.update(key);
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
