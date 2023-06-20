import { useState } from 'react';
import { Website } from '../../types/website';
import MaterialButton from '../button';
import './style.css'
import MaterialDialog from '../dialog';
import { createPortal } from 'react-dom';

export default function PasswordCard(
  params: {
    website: Website,
    notify: (arg0: string) => void,
  },
) {
  const [showPasswordDetails, setShowPasswordDetails] = useState(false);
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
    setShowPasswordDetails(false);
    setShowPassword(false);
  }

  return (
    <>
      <div className='card password-card'>
        <div className='content'>
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
        <div className='actions'>
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
      </div>
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
                  <label>Username / email:</label>
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
                  // onClick: async () => false,
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
