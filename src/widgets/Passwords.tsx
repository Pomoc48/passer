import { UserCredential } from 'firebase/auth';
import { Firestore, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import PasswordCard from './PasswordCard';
import '../scss/widgets/Passwords.scss'
import CreatePassword from './CreatePassword';

function Passwords(params: { db: Firestore, user: UserCredential }) {
  const [passwords, updatePasswords] = useState([]);
  const docRef = doc(params.db, "passwords", params.user.user.uid);

  async function getPasswords() {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      updatePasswords(docSnap.data().passwords);
    }
  }

  useEffect(() => {
    getPasswords();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className='Passwords'>
    <CreatePassword
      reference={docRef}
      refresh={getPasswords} 
      hasPasswords={passwords.length > 0}
    />
    {
      passwords.map((item) =>
        <PasswordCard
          name={item["name"]}
          website={item["website"]}
          username={item["username"]}
          password={item["password"]}
        />
      )
    }
  </div>
}

export default Passwords
