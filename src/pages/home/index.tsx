import './style.scss';
import Navbar from '../../components/common/navbar';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Snackbar from '../../components/common/snackbar';
import { useEmailUser } from '../../context/user';
import { useCryptoKey } from '../../context/key';
import { useNavigate } from 'react-router-dom';
import { autoLogin } from '../../functions/auth';
import MaterialButton from '../../components/common/button';
import LoginDialog from '../../components/dialogs/login';
import SignupDialog from '../../components/dialogs/signup';

export default function HomePage() {
  const [showSnack, setShowSnack] = useState(false);

  const [snackMessage, setSnackMessage] = useState("");
  const [snackLong, setSnackLong] = useState(false);

  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showSignupDialog, setShowSignupDialog] = useState(false);

  const setUser = useEmailUser().update;
  const setCryptoKey = useCryptoKey().update;

  const navigate = useNavigate();

  useEffect(() => {
    autoLogin({ setUser, setCryptoKey, navigate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function notify(message: string, long?: boolean) {
    if (showSnack) {
      return;
    }

    setSnackLong(long ?? false);
    setSnackMessage(message);
    setShowSnack(true);
  }

  return <>
    <Navbar>
      <MaterialButton
        label='Log In'
        onClick={() => setShowLoginDialog(true)}
        icon='login'
        type='tonal'
      />
      <MaterialButton
        id='home-desktop-button'
        label='Create account'
        onClick={() => setShowSignupDialog(true)}
        icon='person_add'
        type='filled'
      />
    </Navbar>
    <main>
      <section>
        <h1>Passer</h1>
        <p>
          Free, open-source and self-hosted password manager.
          Every password with its site data is client-side encrypted before being stored in the cloud.
          The solution for all your password storing related problems.
          <br /><br />
          Create a new testing account to check out the features, or learn more by visiting the project's GitHub repository.
        </p>
        <div className="buttons">
          <MaterialButton
            id='home-mobile-button'
            label='Sign Up'
            onClick={() => setShowSignupDialog(true)}
            icon='person_add'
            type='filled'
          />
          <MaterialButton
            label='Learn more'
            icon='open_in_new'
            type='tonal'
            onClick={() => {
              window.open("https://github.com/Pomoc48/passer", '_blank')!.focus();
            }}
          />
        </div>
      </section>
    </main>
    {
      showLoginDialog
        ? createPortal(
          <LoginDialog
            notify={notify}
            closeDialog={() => setShowLoginDialog(false)}
          />,
          document.body,
        )
        : null
    }
    {
      showSignupDialog
        ? createPortal(
          <SignupDialog
            notify={notify}
            closeDialog={() => setShowSignupDialog(false)}
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
            long={snackLong}
          />,
          document.body,
        )
        : null
    }
  </>
}
