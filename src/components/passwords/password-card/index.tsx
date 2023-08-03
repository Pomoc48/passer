import { useState } from 'react';
import { Website } from '../../../types/website';
import MaterialButton from '../../common/button';
import './style.scss'
import MaterialDialog from '../../common/dialog';
import { createPortal } from 'react-dom';
import { firestoreDelete } from '../../../functions/firestore';
import { CollectionReference, doc } from 'firebase/firestore';
import Card from '../../common/card';

export default function PasswordCard(
  params: {
    website: Website,
    notify: (arg0: string) => void,
    reference: CollectionReference,
  },
) {
  const [showPasswordDetails, setShowPasswordDetails] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);

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
    setShowPasswordDetails(false);
    setShowPassword(false);
  }

  return (
    <>
      <Card variant={true}>
        <div className='password-card-content'>
          <p className='title'>{params.website.data.name}</p>
          <p className={hasURL ? 'url' : "url empty"}>
            {
              hasURL
                ? <a href={url!.toString()} target='_blank' rel="noreferrer">
                  {url!.host}
                  <span className="material-icons">open_in_new</span>
                </a>
                : "*no website"
            }
          </p>
          <p className={hasUsername ? 'username' : "username empty"}>
            {hasUsername ? params.website.data.username : "*no username"}
          </p>
        </div>
        <div className='password-card-actions'>
          {
            params.website.data.password
              ? <MaterialButton
                label='Copy'
                onClick={() => copyContent(params.website.data.password!, "Password")}
                icon='content_copy'
                type='text'
              />
              : null
          }
          <MaterialButton
            label='Options'
            onClick={() => setShowPasswordDetails(true)}
            icon='settings'
            type='tonal'
          />
        </div>

      </Card>
      {
        showPasswordDetails
          ? createPortal(
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
                    setTimeout(() => {
                      setShowRemoveConfirmation(true);
                    }, 310);
                    return true;
                  },
                },
                {
                  label: "Cancel",
                  icon: "close",
                  type: "tonal",
                },
              ]}
            />,
            document.body,
          )
          : null
      }

      {
        showRemoveConfirmation
          ? createPortal(
            <MaterialDialog
              class='confirmation'
              title={"Delete " + params.website.data.name + "?"}
              closeFunction={() => setShowRemoveConfirmation(false)}
              dismissible={true}
              content={[
                <>
                  <div>Are you sure you want to delete this site's data?</div>
                  <br />
                  <div>This action is irreversible.</div>
                  <br />
                </>,
              ]}
              actions={[
                {
                  label: "Delete",
                  icon: "delete",
                  onClick: async () => {
                    await firestoreDelete(
                      doc(params.reference, params.website.uuid),
                    );

                    return true;
                  },
                },
                {
                  label: "Cancel",
                  icon: "close",
                  type: "tonal",
                },
              ]}
            />,
            document.body,
          )
          : null
      }
    </>
  );
}
