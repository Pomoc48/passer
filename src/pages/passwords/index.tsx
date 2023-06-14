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
import { useSearch } from '../../context/searchProvider';
import UserPill from '../../components/user';
import Sorting from '../../components/sorting';
// import SearchMobile from '../../components/search-mobile';

export default function PasswordsPage(params: { db: Firestore }) {
  const user = useGoogleUser().user!;
  const cryptoKey = useCryptoKey();
  const search = useSearch();

  const [websites, updateWebsites] = useState<Website[]>([]);
  const [showModal, setShowModal] = useState(true);

  // const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  // const passwordDialogRef = useRef<Website | null>(null);

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

    const unsubscribe = onSnapshot(websitesColRef, (snapshot) => {
      let websiteList: Website[] = [];

      snapshot.forEach(async (doc) => {
        const decrypted = await decrypt(cryptoKey.key!, new EncryptedData(doc.data().data));

        let newWebsite: Website = {
          uuid: doc.id,
          data: JSON.parse(decrypted),
          favorite: doc.data().favorite,
          time: {
            created: doc.data().time.created.toDate(),
            modified: doc.data().time.modified.toDate(),
            used: doc.data().time.used.toDate(),
          }
        }

        websiteList.push(newWebsite);
      });

      updateWebsites(websiteList);
    });

    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cryptoKey.key]);

  return <>
    <Navbar>
      <div className="pill clickable">
        <span className="material-icons">add</span>
        <p className='label-large'>New password</p>
      </div>
      <Sorting />
      <Search />
      <UserPill user={user} />
      {/* <SearchMobile user={user} /> */}
    </Navbar>
    {
      cryptoKey.key !== null
        ? <div className='passwords'>
          <CreatePassword reference={websitesColRef} />
          {
            websites.filter(
              website => {
                function normalize(value: string): string {
                  return value.trim().toLowerCase();
                }

                function checkMatch(value: string | null | undefined): boolean {
                  if (value === null || value === undefined) {
                    return false;
                  }

                  return normalize(value).includes(normalize(search.value));
                }

                return checkMatch(website.data.name) || checkMatch(website.data.username) || checkMatch(website.data.url?.toString());
              }
            ).map((data, index) => {
              return (
                <PasswordCard
                  key={index}
                  website={data}
                  onClick={() => {

                  }}
                />
              );
            })
          }
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
