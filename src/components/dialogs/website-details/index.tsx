import { useState } from 'react';
import { Website } from '../../../types/website';
import MaterialDialog from '../../common/dialog';
import { dbDelete } from '../../../functions/firestore';
import { CollectionReference, doc } from 'firebase/firestore';
import './style.scss'
import { isStringValid, isUrlValid } from '../../../functions/utils';
import Card from '../../common/card';

export default function WebsiteDialog(
  params: {
    website: Website,
    notify: (message: string, long?: boolean) => void,
    closeDialog: () => void,
    reference: CollectionReference,
    openEdit: () => void,
  },
) {
  const [showPassword, setShowPassword] = useState(false);

  let hasURL = isUrlValid(params.website.data.url);
  let hasUsername = isStringValid(params.website.data.username);
  let hasNote = isStringValid(params.website.data.note);

  function copyContent(content: string, name: string) {
    navigator.clipboard.writeText(content);
    params.notify(name + " copied to clipboard");
  }

  function maskPassword(length: number) {
    let mask = "";

    for (let i = 0; i < length; i++) {
      mask = mask + "•";
    }

    return mask;
  }

  function close() {
    params.closeDialog();
    setShowPassword(false);
  }

  return (
    <MaterialDialog
      class='details'
      title={params.website.data.name}
      closeFunction={close}
      dismissible={true}
      extraWide={true}
      content={[
        <>
          <label>Website URL</label>
          <div className="row">
            <p className={hasURL ? undefined : "empty"}>
              {hasURL ? params.website.data.url!.toString() : "*no website"}
            </p>
            {
              hasURL
                ? <span
                  onClick={() => window.open(params.website.data.url!, '_blank')!.focus()}
                  className="material-symbols-outlined">open_in_new</span>
                : null
            }
          </div>
        </>,
        <>
          <label>Username / e-mail</label>
          <div className="row">
            <p className={hasUsername ? undefined : "empty"}>
              {hasUsername ? params.website.data.username : "*no username"}
            </p>
            {
              hasUsername
                ? <span
                  onClick={() => copyContent(params.website.data.username!, "Username")}
                  className="material-symbols-outlined">content_copy</span>
                : null
            }
          </div>
        </>,
        <>
          <label>Password</label>
          <div className="row">
            <p className={params.website.data.password ? undefined : "empty"}>
              {
                params.website.data.password
                  ? showPassword
                    ? params.website.data.password
                    : maskPassword(params.website.data.password!.length)
                  : "*no password"
              }
            </p>
            {
              params.website.data.password
                ? <>
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="material-symbols-outlined"
                  >
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                  <span
                    onClick={() => copyContent(params.website.data.password!, "Password")}
                    className="material-symbols-outlined"
                  >
                    content_copy
                  </span>
                </>
                : null
            }

          </div>
        </>,
      ]}
      additionalContent={[
        <>
          <label>Note</label>
          <Card>
            {hasNote ? params.website.data.note : "*no note"}
          </Card>
        </>,
      ]}
      actions={[
        {
          label: "Edit",
          icon: "edit",
          onClick: async () => {
            params.openEdit();
            return true;
          },
        },
        {
          label: "Delete",
          icon: "delete",
          type: "error",
          confirmation: true,
          onClick: async () => {
            await dbDelete(
              doc(params.reference, params.website.uuid),
            );

            params.notify("Password successfully removed");
            return true;
          },
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
