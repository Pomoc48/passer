import { useState } from 'react';
import { Website } from '../../../types/website';
import MaterialButton from '../../common/button';
import './style.scss'
import { createPortal } from 'react-dom';
import { CollectionReference } from 'firebase/firestore';
import Card from '../../common/card';
import PasswordDialog from '../../dialogs/password';

export default function WebsiteCard(
  params: {
    website: Website,
    notify: (arg0: string) => void,
    reference: CollectionReference,
  },
) {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

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
            onClick={() => setShowPasswordDialog(true)}
            icon='settings'
            type='tonal'
          />
        </div>

      </Card>
      {
        showPasswordDialog
          ? createPortal(
            <PasswordDialog
              website={params.website}
              notify={params.notify}
              reference={params.reference}
              closeDialog={() => setShowPasswordDialog(false)}
            />,
            document.body,
          )
          : null
      }
    </>
  );
}
