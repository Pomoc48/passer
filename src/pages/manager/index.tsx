import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
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
import Snackbar from '../../components/common/snackbar';
import MaterialButton from '../../components/common/button';
import CreateEditWebsiteDialog from '../../components/dialogs/website-create-edit';
import UserSettingsDialog from '../../components/dialogs/user-settings';
import Loading from '../../components/common/loading';
import NameChangeDialog from '../../components/dialogs/name-change';
import ErrorMessage from '../../components/common/error-message';
import { FirebaseApp } from 'firebase/app';

export type Sorting = "alphabetical" | "newest" | "oldest";

export default function ManagerPage(params: { app: FirebaseApp }) {
  const userContext = useEmailUser();
  const cryptoKey = useCryptoKey().key!;

  const [websites, updateWebsites] = useState<Website[] | null>(null);
  const [search, setSearch] = useState("");

  const [showSnack, setShowSnack] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showUserDialog, setShowUserDialog] = useState(false);
  const [showNameDialog, setShowNameDialog] = useState(false);

  const [sorting, setSorting] = useState<Sorting>("alphabetical");

  const websitesColRef = collection(getFirestore(params.app), "users", userContext.user!.uid, "websites");

  useEffect(() => {
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

      setSearch("");
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

  function editName() {
    setTimeout(() => {
      setShowNameDialog(true);
    }, 310);
  }

  function convertData(websites: Website[]): JSX.Element | JSX.Element[] {
    let sorted = websites.sort((a, b) => {
      if (sorting === 'alphabetical') {
        let nameA = a.data.name.toLowerCase();
        let nameB = b.data.name.toLowerCase();

        return nameA.localeCompare(nameB);
      }

      let createdA = a.time.created.getTime();
      let createdB = b.time.created.getTime();

      if (sorting === 'newest') {
        return createdB - createdA;
      }

      return createdA - createdB;
    });

    if (sorted.length === 0) {
      return <ErrorMessage
        icon='scan_delete'
        message='No data to display'
      />
    }

    let filtered = sorted.filter(
      website => {
        function normalize(value: string): string {
          return value.trim().toLowerCase();
        }

        function checkMatch(value: string | null | undefined): boolean {
          if (value === null || value === undefined) {
            return false;
          }

          return normalize(value).includes(normalize(search));
        }

        return (
          checkMatch(website.data.name) ||
          checkMatch(website.data.username) ||
          checkMatch(website.data.url?.toString())
        );
      }
    );

    if (filtered.length === 0) {
      return <ErrorMessage
        icon='search_off'
        message='No search results found'
      />
    }

    return sorted.map((data, index) => {
      return <WebsiteCard
        key={index}
        website={data}
        notify={notify}
        reference={websitesColRef}
      />;
    });
  }

  return <>
    <Navbar>
      <MaterialButton
        label='Create'
        onClick={() => setShowCreateDialog(true)}
        icon='add'
        type='FAB'
      />
      <Search
        user={userContext.user!}
        openDialog={() => setShowUserDialog(true)}
        search={search}
        setSearch={setSearch}
      />
    </Navbar>
    <div className='passwords'>
      {
        websites === null
          ? <Loading />
          : convertData(websites)
      }
    </div>
    {
      showCreateDialog
        ? createPortal(
          <CreateEditWebsiteDialog
            notify={notify}
            reference={websitesColRef}
            closeDialog={() => setShowCreateDialog(false)}
          />,
          document.body,
        )
        : null
    }
    {
      showUserDialog
        ? createPortal(
          <UserSettingsDialog
            notify={notify}
            user={userContext.user!}
            closeDialog={() => setShowUserDialog(false)}
            sorting={sorting}
            setSorting={setSorting}
            editName={editName}
          />,
          document.body,
        )
        : null
    }
    {
      showNameDialog
        ? createPortal(
          <NameChangeDialog
            closeDialog={() => setShowNameDialog(false)}
            notify={notify}
            user={userContext.user!}
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
            extraSpace={true}
          />,
          document.body,
        )
        : null
    }
  </>
}
