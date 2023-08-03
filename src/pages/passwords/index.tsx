import { Firestore, collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import './style.css'
import { createPortal } from 'react-dom';
import { decrypt } from '../../functions/crypto';
import PasswordCard from '../../components/password-card';
import Search from '../../components/search';
import { useEmailUser } from '../../context/userProvider';
import Navbar from '../../components/common/navbar';
import { useCryptoKey } from '../../context/cryptoKey';
import { Website } from '../../types/website';
import { EncryptedData } from '../../types/encryptedData';
import { useSearch } from '../../context/searchProvider';
import UserPill from '../../components/user';
import NewPasswordButton from '../../components/password-new';
import SearchMobile from '../../components/search-mobile';
import Snackbar from '../../components/common/snackbar';

export default function PasswordsPage(params: { db: Firestore }) {
  const user = useEmailUser().user!;
  const cryptoKey = useCryptoKey().key!;
  const search = useSearch();

  const [websites, updateWebsites] = useState<Website[]>([]);
  const [mobile, updateMobile] = useState(false);

  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const websitesColRef = collection(params.db, "users", user.uid, "websites");

  useEffect(() => {
    let screenSize = 900;
    updateMobile(window.innerWidth <= screenSize);

    window.onresize = () => {
      return updateMobile(window.innerWidth <= screenSize);
    };

    const unsubscribe = onSnapshot(websitesColRef, (snapshot) => {
      let websiteList: Website[] = [];

      snapshot.forEach(async (doc) => {
        const decrypted = await decrypt(cryptoKey, new EncryptedData(doc.data().data));

        let newWebsite: Website = {
          uuid: doc.id,
          data: JSON.parse(decrypted),
          favorite: doc.data().favorite,
          time: {
            created: doc.data().time.created.toDate(),
            modified: doc.data().time.modified.toDate(),
          }
        }

        websiteList.push(newWebsite);
      });

      updateWebsites(websiteList);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <NewPasswordButton
              reference={websitesColRef}
              notify={notify}
            />
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
    <div className={mobile ? 'passwords FAB-space' : 'passwords'}>
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
            reference={websitesColRef}
          />;
        })
      }
    </div>
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
