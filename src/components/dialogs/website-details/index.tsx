import { useState } from 'react';
import { Website } from '../../../types/website';
import MaterialDialog from '../../common/dialog';
import { dbDelete } from '../../../functions/firestore';
import { CollectionReference, doc } from 'firebase/firestore';
import './style.scss'

export default function WebsiteDialog(
  params: {
    website: Website,
    notify: (message: string, long?: boolean) => void,
    closeDialog: () => void,
    reference: CollectionReference,
  },
) {
  const [showPassword, setShowPassword] = useState(false);

  let url = params.website.data.url;

  if (url !== null) {
    try {
      url = new URL(url.toString());
    } catch (_) {
      url = null;
    }
  }

  let hasURL = url !== null;
  let hasUsername = params.website.data.username! !== "";

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
      content={[
        <>
          <label>Website URL:</label>
          <div className="row">
            <p className={hasURL ? undefined : "empty"}>
              {hasURL ? params.website.data.url!.toString() : "*no website"}
            </p>
            {
              hasURL
                ? <span
                  onClick={() => window.open(url!, '_blank')!.focus()}
                  className="material-icons">open_in_new</span>
                : null
            }
          </div>
        </>,
        <>
          <label>Username / e-mail:</label>
          <div className="row">
            <p className={hasUsername ? undefined : "empty"}>
              {hasUsername ? params.website.data.username : "*no username"}
            </p>
            {
              hasUsername
                ? <span
                  onClick={() => copyContent(params.website.data.username!, "Username")}
                  className="material-icons">content_copy</span>
                : null
            }
          </div>
        </>,
        <>
          <label>Password:</label>
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
                    className="material-icons"
                  >
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                  <span
                    onClick={() => copyContent(params.website.data.password!, "Password")}
                    className="material-icons"
                  >
                    content_copy
                  </span>
                </>
                : null
            }

          </div>
        </>,
      ]}
      actions={[
        {
          label: "Edit",
          icon: "edit",
          // onClick: async () => false,
        },
        {
          label: "Delete",
          icon: "delete",
          type: "error",
          onClick: async () => {
            await dbDelete(
              doc(params.reference, params.website.uuid),
            );

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
