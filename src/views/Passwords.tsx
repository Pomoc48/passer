import { UserCredential } from 'firebase/auth';
import { Firestore, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import PasswordCard from '../widgets/PasswordCard';
import '../scss/views/Passwords.scss'
import CreatePassword from '../widgets/CreatePassword';
import { Password } from '../types/Password';

export default function Passwords(params: { db: Firestore, user: UserCredential }) {
  const [passwords, updatePasswords] = useState<Password[]>([]);
  const docRef = doc(params.db, "passwords", params.user.user.uid);

  useEffect(() => {
    onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        updatePasswords(doc.data().passwords);
      }
    });
  }, [docRef]);

  return (
    <div className='Passwords'>
      <CreatePassword reference={docRef} hasPasswords={passwords.length > 0} />
      { passwords.map((password, index) => <PasswordCard key={index} password={password} />) }
    </div>
  );
}
