import { UserCredential } from 'firebase/auth';
import { Firestore, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import PasswordCard from './PasswordCard';
import '../scss/widgets/Passwords.scss'

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
  }, []);

  return <div className='Passwords'>
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
