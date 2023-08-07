import MaterialButton from '../../common/button';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import MaterialDialog from '../../common/dialog';
import { MaterialInput } from '../../common/input';
import { emailRegex } from '../../../functions/auth';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from 'firebase/auth';
import { SnackNotify } from '../../../types/snackNotify';

export default function SignUpButton(params: SnackNotify) {
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
                <div>
                  <p>Please create a secure and memorable password, that's at least 12 characters long.</p>
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

                    let close: boolean = false;
                    const auth = getAuth();

                    createUserWithEmailAndPassword(auth, emailInput, passwordInput)
                      .then((userCredential) => {
                        sendEmailVerification(userCredential.user)
                          .then(() => {
                            params.notify("Account created, please check your e-mail", true);
                            close = true;
                          });
                      })
                      .catch((error) => params.notify(error.message, true));

                    return close;
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
