import './style.css';
import MaterialButton from '../common/button';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import MaterialDialog from '../common/dialog';
import { MaterialInput } from '../common/input';
import { emailRegex, createKeyToken } from '../../functions/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useEmailUser } from '../../context/userProvider';
import { useCryptoKey } from '../../context/cryptoKey';
import { generateKey } from '../../functions/crypto';
import { useNavigate } from 'react-router-dom';

export default function LogInButton(params: { notify: (message: string, long?: boolean) => void }) {
  const [showDialog, setShowDialog] = useState(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const setUser = useEmailUser().update;
  const setCryptoKey = useCryptoKey().update;

  const navigate = useNavigate();

  return (
    <>
      <MaterialButton
        label='Log In'
        onClick={() => setShowDialog(true)}
        icon='login'
        type='tonal'
      />
      {
        showDialog
          ? createPortal(
            <MaterialDialog
              class='details'
              title="Log in to your account"
              closeFunction={() => setShowDialog(false)}
              dismissible={true}
              content={[
                <>
                  <label>E-mail:</label>
                  <MaterialInput
                    placeholder="user@example.com"
                    type="email"
                    ref={emailRef}
                  />
                </>,
                <>
                  <label>Password:</label>
                  <MaterialInput
                    placeholder="password123"
                    type="password"
                    ref={passwordRef}
                  />
                </>,
                <div />,
              ]}
              actions={[
                {
                  label: "Continue",
                  icon: "check",
                  onClick: async () => {
                    let emailInput = emailRef.current!.value.trim();
                    let passwordInput = passwordRef.current!.value.trim();

                    if (passwordInput.length < 12) {
                      params.notify("Password is too short");
                      return false;
                    }

                    if (passwordInput.length > 200) {
                      params.notify("Password is too long");
                      return false;
                    }

                    if (!emailInput.match(emailRegex)) {
                      params.notify("Invalid e-mail address");
                      return false;
                    }

                    let token = await createKeyToken(emailInput, passwordInput);
                    const auth = getAuth();

                    signInWithEmailAndPassword(auth, emailInput, passwordInput)
                      .then(async (userCredential) => {
                        setShowDialog(false);

                        if (!userCredential.user.emailVerified) {
                          params.notify("Please verify your e-mail address");
                        } else {
                          localStorage.setItem('keyToken', token);

                          setUser(userCredential.user);
                          setCryptoKey(await generateKey(token));

                          navigate("/manager");
                        }
                      })
                      .catch((error) => params.notify(error.message));

                    return false;
                  }
                },
                {
                  label: "Cancel",
                  icon: "close",
                  type: "tonal",
                },
              ]}
            />,
            document.body
          )
          : null
      }
    </>
  );
}
