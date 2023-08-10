import { useState } from 'react';
import { Website } from '../../../types/website';
import MaterialButton from '../../common/button';
import './style.scss'
import { createPortal } from 'react-dom';
import { CollectionReference } from 'firebase/firestore';
import Card from '../../common/card';
import WebsiteDialog from '../../dialogs/website-details';
import { isUrlValid } from '../../../functions/utils';
import CreateEditWebsiteDialog from '../../dialogs/website-create-edit';

export default function WebsiteCard(
  params: {
    website: Website,
    notify: (arg0: string) => void,
    reference: CollectionReference,
  },
) {
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showPasswordEditDialog, setShowPasswordEditDialog] = useState(false);

  let hasURL = isUrlValid(params.website.data.url);
  let hasUsername = params.website.data.username! !== "";

  function copyContent(content: string, name: string) {
    navigator.clipboard.writeText(content);
    params.notify(name + " copied to clipboard");
  }

  function openWebsiteEdit() {
    setTimeout(() => {
      setShowPasswordEditDialog(true);
    }, 310);
  }

  return (
    <>
      <Card variant={true}>
        <div className='password-card-content'>
          <p className='title'>{params.website.data.name}</p>
          <p className={hasURL ? 'url' : "url empty"}>
            {
              hasURL
                ? <a href={params.website.data.url!.toString()} target='_blank' rel="noreferrer">
                  {new URL(params.website.data.url!).host}
                  <span className="material-icons-outlined">open_in_new</span>
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
            label='Details'
            onClick={() => setShowPasswordDialog(true)}
            icon='description'
            type='tonal'
          />
        </div>

      </Card>
      {
        showPasswordDialog
          ? createPortal(
            <WebsiteDialog
              website={params.website}
              notify={params.notify}
              reference={params.reference}
              closeDialog={() => setShowPasswordDialog(false)}
              openEdit={openWebsiteEdit}
            />,
            document.body,
          )
          : null
      }
      {
        showPasswordEditDialog
          ? createPortal(
            <CreateEditWebsiteDialog
              website={params.website}
              notify={params.notify}
              reference={params.reference}
              closeDialog={() => setShowPasswordEditDialog(false)}
            />,
            document.body,
          )
          : null
      }
    </>
  );
}
