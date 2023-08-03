import './style.scss';
import Navbar from '../../components/common/navbar';
import LogInButton from '../../components/welcome/login-dialog';
import SignUpButton from '../../components/welcome/signup-dialog';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Snackbar from '../../components/common/snackbar';
import { useEmailUser } from '../../context/userProvider';
import { useCryptoKey } from '../../context/cryptoKey';
import { useNavigate } from 'react-router-dom';
import { autoLogin } from '../../functions/auth';
import MaterialButton from '../../components/common/button';

export default function WelcomePage() {
  const [showSnack, setShowSnack] = useState(false);
  const [mobile, updateMobile] = useState(false);

  const [snackMessage, setSnackMessage] = useState("");
  const [snackLong, setSnackLong] = useState(false);

  const setUser = useEmailUser().update;
  const setCryptoKey = useCryptoKey().update;

  const navigate = useNavigate();

  useEffect(() => {
    let screenSize = 640;
    updateMobile(window.innerWidth <= screenSize);

    window.onresize = () => {
      return updateMobile(window.innerWidth <= screenSize);
    };
  }, []);

  useEffect(() => {
    autoLogin(setUser, setCryptoKey, navigate);
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
      <LogInButton notify={notify} />
      {mobile ? null : <SignUpButton notify={notify} />}
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
          {mobile ? <SignUpButton notify={notify} /> : null}
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
      showSnack
        ? createPortal(
          <Snackbar
            close={() => setShowSnack(false)}
            message={snackMessage}
            mobile={mobile}
            long={snackLong}
          />,
          document.body,
        )
        : null
    }
  </>
}
