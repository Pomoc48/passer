import { useRef } from 'react';
import MaterialDialog from '../../common/dialog';
import { MaterialInput } from '../../common/input';
import { createUserAccount, emailRegex } from '../../../functions/auth';

export default function SignupDialog(
  params: {
    notify: (message: string, long?: boolean) => void,
    closeDialog: () => void,
  }
) {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const password2Ref = useRef<HTMLInputElement | null>(null);

  return (
    <MaterialDialog
      class='details'
      title="Create a new account"
      closeFunction={params.closeDialog}
      dismissible={true}
      content={[
        <div>
          <p>Please create a secure and memorable password, that's at least 12 characters long.</p>
        </div>,
        <>
          <label>E-mail</label>
          <MaterialInput
            placeholder="user@example.com"
            type="email"
            ref={emailRef}
          />
        </>,
        <>
          <label>Password</label>
          <MaterialInput
            placeholder="password123"
            type="password"
            ref={passwordRef}
          />
        </>,
        <>
          <label>Repeat password</label>
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

            if (passwordInput !== password2Input) {
              params.notify("Passwords do not match");
              return false;
            }

            let outcome = await createUserAccount(emailInput, passwordInput);

            if (outcome !== true) {
              params.notify(outcome, true);
            }

            return true;
          }
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
