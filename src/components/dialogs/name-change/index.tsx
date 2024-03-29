import { useEffect, useRef } from 'react';
import { MaterialInput } from '../../../components/common/input';
import MaterialDialog from '../../../components/common/dialog';
import { User, updateProfile } from 'firebase/auth';

export default function NameChangeDialog(
  params: {
    notify: (message: string, long?: boolean) => void,
    closeDialog: () => void,
    user: User,
  }
) {
  const nameRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    nameRef.current!.value = params.user.displayName ?? "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function submit(): Promise<boolean> {
    let name = nameRef.current!.value.trim();

    if (name.length < 3) {
      params.notify("Account name too short");
      return false;
    }

    if (name.length > 32) {
      params.notify("Account name too long");
      return false;
    }

    updateProfile(params.user, {
      displayName: name,
    }).then(() => {
      params.notify("Account name updated successfully");
    }).catch((error) => {
      params.notify(error);
    });

    return true;
  }

  return (
    <MaterialDialog
      class='name-change'
      title="User name change"
      closeFunction={params.closeDialog}
      dismissible={true}
      content={[
        <>
          <label>Account display name</label>
          <MaterialInput
            placeholder="John Smith"
            type="text"
            ref={nameRef}
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
          label: "Accept",
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
