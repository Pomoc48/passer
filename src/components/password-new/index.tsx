import { CollectionReference } from "firebase/firestore"
import { encrypt } from "../../functions/crypto";
import { firebaseInsert } from "../../functions/firebaseInsert";
import { UploadData } from "../../types/uploadData";
import ShortUniqueId from "short-unique-id";
import { useCryptoKey } from "../../context/cryptoKey";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import MaterialDialog from "../dialog";
// import { GeneratePassword } from "js-generate-password";
import MaterialButton from "../button";

export default function NewPasswordButton(params: { reference: CollectionReference }) {
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

  return (
    <>
      <MaterialButton
        label='New password'
        onClick={() => { setShowDialog(true) }}
        icon='add'
        type='filled'
      />
      {
        showDialog
          ? createPortal(
            <MaterialDialog
              title="Add new password"
              maxWidth={900}
              content={[
                <>
                  <label htmlFor="name">Password name:</label>
                  <input
                    id="name"
                    type="text"
                    className='DialogInput'
                    placeholder='ex. Wordpress Admin'
                    ref={nameRef}
                  />
                </>,
                <>
                  <label htmlFor="url">Website URL:</label>
                  <input
                    id="url"
                    type='url'
                    className='DialogInput'
                    placeholder='https://www.example.com/'
                    ref={urlRef}
                  />
                </>,
                <>
                  <label htmlFor="username">Username / email:</label>
                  <input
                    id="username"
                    type='text'
                    className='DialogInput'
                    placeholder='johnSmith94'
                    ref={usernameRef}
                  />
                </>,
                <>
                  <label htmlFor="password">Password:</label>
                  <input
                    id="password"
                    type='text'
                    className='DialogInput'
                    placeholder='0pX<W=gGTZoVRWqIoCMZ'
                    ref={passwordRef}
                  />
                </>,
              ]}
              closeFunction={() => {
                setShowDialog(false);
              }}
              actions={[
                {
                  label: "Cancel",
                  icon: "close",
                  type: "tonal",
                },
                {
                  label: "Confirm",
                  icon: "check",
                  onClick: async () => {
                    let urlInput = urlRef.current!.value.trim();

                    if (nameRef.current!.value.trim() === "") {
                      return;
                    }

                    if (urlInput !== "") {
                      try {
                        new URL(urlInput);
                      } catch (_) {
                        return;
                      }
                    }

                    prepareEncryptedData();
                  }
                },
              ]}
            />,
            document.body
          )
          : null
      }
    </>
  );
}
