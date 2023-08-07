import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MaterialInput } from '../../../components/common/input';
import MaterialDialog from '../../../components/common/dialog';
import { useEmailUser } from '../../../context/userProvider';
import { useCryptoKey } from '../../../context/cryptoKey';
import { emailRegex, logUserIn } from '../../../functions/auth';

export default function LoginDialog(
  params: {
    notify: (message: string, long?: boolean) => void,
    closeDialog: () => void,
  }
) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const setUser = useEmailUser().update;
  const setCryptoKey = useCryptoKey().update;
  const navigate = useNavigate();

  return (
    <MaterialDialog
      class='login'
      title="Log in to your account"
      closeFunction={params.closeDialog}
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

            if (!emailInput.match(emailRegex)) {
              params.notify("Invalid e-mail address");
              return false;
            }

            if (passwordInput.length < 12) {
              params.notify("Password is too short");
              return false;
            }

            if (passwordInput.length > 200) {
              params.notify("Password is too long");
              return false;
            }

            let outcome = await logUserIn(
              emailInput,
              passwordInput,
              { navigate, setCryptoKey, setUser },
            );

            if (outcome !== true) {
              params.notify(outcome);
            }

            return false;
          }
        },
        {
          label: "Cancel",
          icon: "close",
          type: "tonal",
        },
      ]}
    />
  );
}
