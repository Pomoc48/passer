import './style.css';
import MaterialButton from '../button';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import MaterialDialog from '../dialog';
import { MaterialInput } from '../input';

export default function LogInButton() {

  const [showDialog, setShowDialog] = useState(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  // const provider = new GoogleAuthProvider();
  // const auth = getAuth();

  // const { update } = useGoogleUser();
  // const navigate = useNavigate();

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
                  // onClick: async () => false,
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
