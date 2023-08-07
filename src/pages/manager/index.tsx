import { Firestore, collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import './style.scss'
import { createPortal } from 'react-dom';
import { decrypt } from '../../functions/crypto';
import WebsiteCard from '../../components/manager/website-card';
import Search from '../../components/manager/search';
import { useEmailUser } from '../../context/user';
import Navbar from '../../components/common/navbar';
import { useCryptoKey } from '../../context/key';
import { Website } from '../../types/website';
import { EncryptedData } from '../../types/encryptedData';
import { useSearch } from '../../context/search';
import SearchMobile from '../../components/manager/search-mobile';
import Snackbar from '../../components/common/snackbar';
import Pill from '../../components/common/pill';
import Avatar from '../../components/common/avatar';
import { signUserOut } from '../../functions/auth';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import MaterialButton from '../../components/common/button';
import CreateWebsiteDialog from '../../components/dialogs/website-create';

export default function ManagerPage(params: { db: Firestore }) {
  const userContext = useEmailUser();
  const cryptoKey = useCryptoKey().key!;
  const search = useSearch();

  const [websites, updateWebsites] = useState<Website[]>([]);
  const [mobile, updateMobile] = useState(false);

  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const websitesColRef = collection(params.db, "users", userContext.user!.uid, "websites");

  const auth = getAuth();
  const navigate = useNavigate();

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
      <MaterialButton
        label='Create'
        onClick={() => setShowCreateDialog(true)}
        icon='add'
        type={mobile ? 'FAB' : "filled"}
      />
      {
        mobile
          ? <SearchMobile user={userContext.user!} />
          : <>
            <Search />
            <Pill onClick={() => signUserOut(auth, userContext.update, navigate)}>
              <Avatar user={userContext.user!} />
              <p className='display-name'>{userContext.user!.email!}</p>
            </Pill>
          </>
      }
    </Navbar>
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
          return <WebsiteCard
            key={index}
            website={data}
            notify={notify}
            reference={websitesColRef}
          />;
        })
      }
    </div>
    {
      showCreateDialog
        ? createPortal(
          <CreateWebsiteDialog
            notify={notify}
            reference={websitesColRef}
            closeDialog={() => setShowCreateDialog(false)}
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
