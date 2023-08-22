import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MaterialInput } from '../../../components/common/input';
import MaterialDialog from '../../../components/common/dialog';
import { useEmailUser } from '../../../context/user';
import { useCryptoKey } from '../../../context/key';
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

  async function submit(): Promise<boolean> {
    let emailInput = emailRef.current!.value.trim();
    let passwordInput = passwordRef.current!.value.trim();

    if (!emailInput.match(emailRegex)) {
      params.notify("Invalid e-mail address");
      return false;
    }

    if (emailInput.length > 64) {
      params.notify("E-mail is too long");
      return false;
    }

    if (passwordInput.length < 12) {
      params.notify("Password is too short");
      return false;
    }

    if (passwordInput.length > 128) {
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

    return true;
  }

  return (
    <MaterialDialog
      class='login'
      title="Log in to your account"
      closeFunction={params.closeDialog}
      dismissible={true}
      content={[
        <>
          <label>E-mail</label>
          <MaterialInput
            placeholder="user@example.com"
            type="email"
            ref={emailRef}
            onSubmit={() => passwordRef.current!.focus()}
          />
        </>,
        <>
          <label>Password</label>
          <MaterialInput
            placeholder="password123"
            type="password"
            ref={passwordRef}
            onSubmit={async () => {
              if (await submit()) {
                params.closeDialog();
              }
            }}
          />
        </>,
        <div />,
      ]}
      actions={[
        {
          label: "Continue",
          icon: "check",
          onClick: submit,
        },
        {
          label: "Cancel",
          icon: "close",
          type: "text",
        },
      ]}
    />
  );
}
