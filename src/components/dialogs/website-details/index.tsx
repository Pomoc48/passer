import { useState } from 'react';
import { Website } from '../../../types/website';
import MaterialDialog from '../../common/dialog';
import { dbDelete } from '../../../functions/firestore';
import { CollectionReference, doc } from 'firebase/firestore';
import { hiddenData, isStringValid, isUrlValid } from '../../../functions/utils';
import DataContainer from '../../manager/data-container';
import Card from '../../common/card';
import "./style.scss";

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
  const [showNote, setShowNote] = useState(false);

  const hasURL = isUrlValid(params.website.data.url);
  const hasUsername = isStringValid(params.website.data.username);
  const hasPassword = isStringValid(params.website.data.password);
  const hasNote = isStringValid(params.website.data.note);

  const created = params.website.time.created.toLocaleString();
  const modified = params.website.time.modified.toLocaleString();

  function copyContent(content: string, name: string) {
    navigator.clipboard.writeText(content);
    params.notify(name + " copied to clipboard");
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
          <DataContainer empty={!hasURL}>
            <p>{hasURL ? params.website.data.url!.toString() : "*no website"}</p>
            {
              hasURL
                ? <>
                  <span
                    onClick={() => window.open(params.website.data.url!, '_blank')!.focus()}
                    className="material-symbols-outlined"
                  >
                    open_in_new
                  </span>
                  <span
                    onClick={() => copyContent(params.website.data.url!, "Website URL")}
                    className="material-symbols-outlined"
                  >
                    content_copy
                  </span>
                </>
                : null
            }
          </DataContainer>
        </>,
        <>
          <label>Username / e-mail</label>
          <DataContainer empty={!hasUsername}>
            <p>{hasUsername ? params.website.data.username : "*no username"}</p>
            {
              hasUsername
                ? <span
                  onClick={() => copyContent(params.website.data.username!, "Username")}
                  className="material-symbols-outlined">content_copy</span>
                : null
            }
          </DataContainer>
        </>,
        <>
          <label>Password</label>
          <DataContainer empty={!hasPassword}>
            <p>
              {
                hasPassword
                  ? showPassword
                    ? params.website.data.password
                    : hiddenData()
                  : "*no password"
              }
            </p>
            {
              hasPassword
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
          </DataContainer>
        </>,
      ]}
      additionalContent={[
        <>
          <label>Details</label>
          <Card>
            <p className='date-info'>
              Created: <span>{created}</span>
            </p>
            <p className='date-info'>
              Modified: {
                modified === created
                  ? <span>No modifications done</span>
                  : <span>{modified}</span>
              }
            </p>
          </Card>
        </>,
        <>
          <label>Note</label>
          <DataContainer noteFormatting={true} empty={!hasNote}>
            <p>
              {
                hasNote
                  ? showNote
                    ? params.website.data.note
                    : hiddenData()
                  : "*no note"
              }
            </p>
            {
              hasNote
                ? <span
                  onClick={() => setShowNote(!showNote)}
                  className="material-symbols-outlined"
                >
                  {showNote ? "visibility_off" : "visibility"}
                </span>
                : null
            }
          </DataContainer>
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
