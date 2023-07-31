import './style.css';
import Navbar from '../../components/navbar';
import LogInButton from '../../components/login-dialog';
import SignUpButton from '../../components/signup-dialog';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Snackbar from '../../components/snackbar';
import { useEmailUser } from '../../context/userProvider';
import { useCryptoKey } from '../../context/cryptoKey';
import { useNavigate } from 'react-router-dom';
import { autoLogin } from '../../functions/auth';

export default function WelcomePage() {
  const [showSnack, setShowSnack] = useState(false);
  const [mobile, updateMobile] = useState(false);

  const [snackMessage, setSnackMessage] = useState("");
  const [snackLong, setSnackLong] = useState(false);

  const setUser = useEmailUser().update;
  const setCryptoKey = useCryptoKey().update;

  const navigate = useNavigate();

  useEffect(() => {
    let screenSize = 900;
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
      <SignUpButton notify={notify} />
    </Navbar>
    <main>
      <div className="section-container">
        <section>
          <span className="material-icons">password</span>
          <div className="text">
            <h2 className='primary-text display-large'>Passer</h2>
            <p className='body-large'>Open-source password manager, presented by Mikołaj Łukawski. The solution for all your password storing related problems.</p>
          </div>
        </section>
      </div>
      <div className="section-container">
        <section>
          <div className="text">
            <h3 className='primary-text headline-large'>Secure</h3>
            <p className='body-large'>Your passwords and all site data are client-side encrypted, before being safely stored on the database. The encryption/decryption key is generated locally using your master password and never leaves your device.</p>
          </div>
          <span className="material-icons">key</span>
        </section>
      </div>
      <div className="section-container">
        <section>
          <span className="material-icons">code</span>
          <div className="text">
            <h3 className='primary-text headline-large'>Transparent</h3>
            <p className='body-large'>The source code is fully available with it's documentation and step by step instructions in the GitHub repo, and the entire solution is easily self-hostable using the free tier of Firebase.</p>
          </div>
        </section>
      </div>
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
