import { UserCredential } from 'firebase/auth';
import { Firestore, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import PasswordCard from '../widgets/PasswordCard';
import '../scss/views/Passwords.scss'
import CreatePassword from '../widgets/CreatePassword';
import { SiteData } from '../types/SiteData';
import { createPortal } from 'react-dom';
import Dialog from '../widgets-common/Dialog';
import { digestMessage } from '../functions/Digest';

export default function Passwords(params: { db: Firestore, user: UserCredential }) {
  const [websites, updateWebsites] = useState<SiteData[]>([]);
  const docRef = doc(params.db, "passwords", params.user.user.uid);
  const [showModal, setShowModal] = useState(true);
  const [passwordEntered, setPasswordEntered] = useState(false);

  const passwordRef = useRef<HTMLInputElement | null>(null);

  console.log("rerender");

  useEffect(() => {
    if (!passwordEntered) {
      return;
    }

    onSnapshot(docRef, (doc) => {
      if (doc.exists() && doc.data().passwords !== undefined) {
        let passwords = doc.data().passwords;
        let newPasswords: SiteData[] = [];

        Object.keys(passwords).forEach(key => {
          newPasswords.push({
            uuid: key,
            name: passwords[key].name,
            note: passwords[key].note,
            password: passwords[key].password,
            username: passwords[key].username,
            url: passwords[key].url,
          });
        });
        
        updateWebsites(newPasswords);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passwordEntered]);

  return <>
    <div className='Passwords'>
      <CreatePassword reference={docRef} />
      { websites.map((website, index) => <PasswordCard key={index} website={website} />) }
    </div>
    {
      showModal
        ? createPortal(
          <Dialog
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

                console.log(await digestMessage(passwordRef.current.value));
                
                setPasswordEntered(true);
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
