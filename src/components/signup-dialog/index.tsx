import './style.css';
import MaterialButton from '../button';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import MaterialDialog from '../dialog';
import { MaterialInput } from '../input';
import { emailRegex, passTransform } from '../../functions/login';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';

export default function SignUpButton(params: { notify: (message: string, long?: boolean) => void }) {
  const [showDialog, setShowDialog] = useState(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const password2Ref = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <MaterialButton
        label='Create account'
        onClick={() => setShowDialog(true)}
        icon='person_add'
        type='filled'
      />
      {
        showDialog
          ? createPortal(
            <MaterialDialog
              class='details'
              title="Create a new account"
              closeFunction={() => setShowDialog(false)}
              dismissible={true}
              content={[
                <div className='info'>
                  <div>Please create a secure and memorable password, that's at least 12 characters long.</div>
                  <br />
                  <div>You can try using something like the Diceware or any other popular memorable password generation technique.</div>
                  <br />
                </div>,
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
                <>
                  <label>Repeat password:</label>
                  <MaterialInput
                    placeholder="password123"
                    type="password"
                    ref={password2Ref}
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
                    let password2Input = password2Ref.current!.value.trim();

                    if (passwordInput.length < 12) {
                      params.notify("Password is too short");
                      return false;
                    }

                    if (passwordInput.length > 200) {
                      params.notify("Password is too long");
                      return false;
                    }

                    if (passwordInput !== password2Input) {
                      params.notify("Passwords do not match");
                      return false;
                    }

                    if (!emailInput.match(emailRegex)) {
                      params.notify("Invalid e-mail address");
                      return false;
                    }

                    console.log(await passTransform(emailInput, passwordInput));

                    const auth = getAuth();

                    createUserWithEmailAndPassword(auth, emailInput, passwordInput)
                      .then((userCredential) => {
                        console.log(userCredential.user);

                        sendEmailVerification(userCredential.user)
                          .then(() => {
                            params.notify("Account created, please check your e-mail", true);
                          });
                      })
                      .catch((error) => params.notify(error.message, true));

                    return true;
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
