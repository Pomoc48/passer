import { CollectionReference } from "firebase/firestore"
import { encrypt } from "../../functions/crypto";
import { firebaseInsert } from "../../functions/firebaseInsert";
import { UploadData } from "../../types/uploadData";
import ShortUniqueId from "short-unique-id";
import './style.css'
import { useCryptoKey } from "../../context/cryptoKey";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import MaterialDialog from "../dialog";
import { GeneratePassword } from "js-generate-password";

export default function CreatePassword(params: { reference: CollectionReference }) {
  const cryptoKey = useCryptoKey().key!;
  const [showDialog, setShowDialog] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const urlRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  async function prepareEncryptedData() {
    const uid = new ShortUniqueId({ length: 16 });

    const data = {
      name: nameRef.current!.value.trim(),
      note: null,
      password: passwordRef.current!.value.trim(),
      url: urlRef.current!.value.trim(),
      username: usernameRef.current!.value.trim(),
    };

    const serialized = JSON.stringify(data);
    const encrypted = await encrypt(cryptoKey, serialized);

    const uploadData: UploadData = {
      uuid: uid(),
      websiteData: encrypted,
      favorite: false,
      time: {
        created: new Date(),
        modified: new Date(),
        used: new Date(),
      }
    }

    setShowDialog(false);
    await firebaseInsert(params.reference, uploadData);
  }

  return (<>
    <div
      className='card create-password title-large clickable'
      onClick={() => setShowDialog(true)}
    >
      <span className="material-icons">add</span>
      <p>New Password</p>
    </div>
    {
      showDialog
        ? createPortal(
          <MaterialDialog
            title="Add new password"
            content={
              <>
                <label htmlFor="name">Password name:</label>
                <input
                  id="name"
                  type="text"
                  className='DialogInput'
                  placeholder='ex. Wordpress Admin'
                  ref={nameRef}
                />
                <label htmlFor="url">Website URL:</label>
                <input
                  id="url"
                  type='url'
                  className='DialogInput'
                  placeholder='https://www.example.com/'
                  ref={urlRef}
                />
                <label htmlFor="username">Username / email:</label>
                <input
                  id="username"
                  type='text'
                  className='DialogInput'
                  placeholder='johnSmith94'
                  ref={usernameRef}
                />
                <label htmlFor="password">Password:</label>
                <input
                  id="password"
                  type='text'
                  className='DialogInput'
                  placeholder='0pX<W=gGTZoVRWqIoCMZ'
                  ref={passwordRef}
                />
                <button
                  className="text icon-button clickable"
                  onClick={() => {
                    if (passwordRef.current === null) {
                      return;
                    }

                    let password = GeneratePassword({
                      length: 20,
                      numbers: true,
                      symbols: true,
                    })

                    passwordRef.current.value = password;
                  }}
                >
                  <span className="material-icons">auto_fix_high</span>
                </button>
              </>
            }
            closeFunction={() => {
              setShowDialog(false);
            }}
            actions={
              [{
                name: "Confirm",
                onClick: async () => {
                  if (nameRef.current === null) {
                    return;
                  }

                  if (nameRef.current.value.trim() === "") {
                    return;
                  }

                  prepareEncryptedData();
                }
              }]
            }
          />,
          document.body
        )
        : null
    }
  </>
  );
}
