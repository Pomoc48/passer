import { UserCredential } from 'firebase/auth';
import { Firestore, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import PasswordCard from '../widgets/PasswordCard';
import '../scss/views/Passwords.scss'
import CreatePassword from '../widgets/CreatePassword';
import { SiteData } from '../types/SiteData';
import { createPortal } from 'react-dom';

export default function Passwords(params: { db: Firestore, user: UserCredential }) {
  const [websites, updateWebsites] = useState<SiteData[]>([]);
  const docRef = doc(params.db, "passwords", params.user.user.uid);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
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
  }, []);

  return <>
    <div className='Passwords'>
      <CreatePassword reference={docRef} />
      { websites.map((website, index) => <PasswordCard key={index} website={website} />) }
    </div>
    { showModal ? createPortal(<div onClick={() => setShowModal(false)}>Test</div>, document.body) : null }
  </>
}
