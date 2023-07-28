import { Firestore, collection, doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import './style.css'
import { createPortal } from 'react-dom';
import { decrypt, exportKey, generateKey, importKey } from '../../functions/crypto';
import { testCaseMatch, updateTestCase } from '../../functions/passwordTestCase';
import PasswordCard from '../../components/password-card';
import MaterialDialog from '../../components/dialog';
import Search from '../../components/search';
import { useEmailUser } from '../../context/userProvider';
import Navbar from '../../components/navbar';
import { useCryptoKey } from '../../context/cryptoKey';
import { Website } from '../../types/website';
import { EncryptedData } from '../../types/encryptedData';
import { useSearch } from '../../context/searchProvider';
import UserPill from '../../components/user';
import NewPasswordButton from '../../components/password-new';
import SearchMobile from '../../components/search-mobile';
import { MaterialInput } from '../../components/input';
import Snackbar from '../../components/snackbar';

export default function PasswordsPage(params: { db: Firestore }) {
  const user = useEmailUser().user!;
  const cryptoKey = useCryptoKey();
  const search = useSearch();

  const [websites, updateWebsites] = useState<Website[]>([]);
  const [showPasswordDialog, setShowPasswordDialog] = useState(true);
  const [passwordFail, setPasswordFail] = useState(true);
  const [mobile, updateMobile] = useState(false);

  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const passwordRef = useRef<HTMLInputElement | null>(null);

  const userDocRef = doc(params.db, "users", user.user.uid);
  const websitesColRef = collection(params.db, "users", user.user.uid, "websites");

  useEffect(() => {
    let screenSize = 900;
    updateMobile(window.innerWidth <= screenSize);

    window.onresize = () => {
      return updateMobile(window.innerWidth <= screenSize);
    };

    const keyData = localStorage.getItem(user.user.uid);

    if (keyData !== null) {
      validateKey(keyData);
    }

    async function validateKey(keyData: string) {
      let key: CryptoKey = await importKey(keyData);

      if (await testCaseMatch(userDocRef!, key)) {
        cryptoKey.update(key);
        setShowPasswordDialog(false);
      } else {
        cryptoKey.update(null);
        setPasswordFail(true);
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
      if (cryptoKey.key !== null) {
        unsubscribe();
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cryptoKey.key]);

  async function masterSubmit() {
    if (passwordRef.current === null) {
      return false;
    }

    if (passwordRef.current.value === "") {
      return false;
    }

    let key: CryptoKey = await generateKey(passwordRef.current.value);

    if (passwordFail && !await testCaseMatch(userDocRef!, key)) {
      notify("Invalid password");
      return false;
    }

    if (!passwordFail) {
      await updateTestCase(userDocRef, key);
    }

    const keyData = await exportKey(key);
    localStorage.setItem(user.user.uid, keyData);
    cryptoKey.update(key);

    if (passwordFail) {
      notify("Passwords successfully decrypted");
    } else {
      notify("Master password successfully updated");
    }

    return true;
  }

  function notify(message: string) {
    if (showSnack) {
      return;
    }

    setSnackMessage(message);
    setShowSnack(true);
  }

  return <>
    <Navbar>
      {
        mobile
          ? <SearchMobile user={user} />
          : <>
            <NewPasswordButton reference={websitesColRef} notify={notify} />
            <Search />
            <UserPill user={user} />
          </>
      }
    </Navbar>
    {
      mobile
        ? <NewPasswordButton
          reference={websitesColRef}
          notify={notify}
          isFAB={true}
        />
        : null
    }
    {
      cryptoKey.key !== null
        ? <div className={mobile ? 'passwords FAB-space' : 'passwords'}>
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
              return <PasswordCard
                key={index}
                website={data}
                notify={notify}
              />;
            })
          }
        </div>
        : null
    }
    {
      showPasswordDialog
        ? createPortal(
          <MaterialDialog
            class='master'
            title={passwordFail ? "Verify your password" : "Master password setup"}
            closeFunction={() => setShowPasswordDialog(false)}
            dismissible={false}
            content={[
              <div>Please enter your master password used for encrypting and decrypting your data.</div>,
              <form onSubmit={async (e) => {
                e.preventDefault();
                if (await masterSubmit()) {
                  setShowPasswordDialog(false);
                }
              }}>
                <MaterialInput
                  placeholder='SecretPassword123'
                  type='password'
                  ref={passwordRef}
                />
              </form>
            ]}
            actions={
              [{
                label: "Confirm",
                icon: "check",
                onClick: masterSubmit,
              }]
            }
          />,
          document.body,
        )
        : null
    }
    {
      showSnack
        ? createPortal(
          <Snackbar
            close={() => setShowSnack(false)}
            message={snackMessage}
            mobile={mobile}
          />,
          document.body,
        )
        : null
    }
  </>
}
