import { CollectionReference } from "firebase/firestore"
import { encrypt } from "../../functions/crypto";
import { firebaseInsert } from "../../functions/firebaseInsert";
import { UploadData } from "../../types/uploadData";
import ShortUniqueId from "short-unique-id";
import { useCryptoKey } from "../../context/cryptoKey";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import MaterialDialog from "../dialog";
import { GeneratePassword } from "js-generate-password";
import MaterialButton from "../button";
import "./style.css";
import { MaterialInput } from "../input";

export default function NewPasswordButton(
  params: {
    reference: CollectionReference,
    notify: (message: string) => void,
    isFAB?: boolean,
  },
) {
  const cryptoKey = useCryptoKey().key!;
  const [showDialog, setShowDialog] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const urlRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [useNumbers, setUseNumbers] = useState(true);
  const [useCharacters, setUseCharacters] = useState(true);
  const [passwordSize, setPasswordSize] = useState(24);

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

    await firebaseInsert(params.reference, uploadData);
    params.notify("New password successfully added");
  }

  return (
    <>
      <MaterialButton
        label='New password'
        onClick={() => { setShowDialog(true) }}
        icon='add'
        type='filled'
        isFAB={params.isFAB}
      />
      {
        showDialog
          ? createPortal(
            <MaterialDialog
              class="new"
              title="Add new password"
              maxWidth={900}
              dismissible={true}
              closeFunction={() => setShowDialog(false)}
              content={[
                <>
                  <label>Password name:</label>
                  <MaterialInput
                    placeholder="ex. Wordpress Admin"
                    type="text"
                    ref={nameRef}
                  />
                </>,
                <>
                  <label>Website URL:</label>
                  <MaterialInput
                    placeholder="https://www.example.com/"
                    type="url"
                    ref={urlRef}
                  />
                </>,
                <>
                  <label>Username / e-mail:</label>
                  <MaterialInput
                    placeholder="johnSmith94"
                    type="text"
                    ref={usernameRef}
                  />
                </>,
                <>
                  <label>Password:</label>
                  <MaterialInput
                    placeholder="0pX<W=gGTZoVRWqIoCMZ"
                    type="text"
                    ref={passwordRef}
                  />
                </>,
              ]}
              additionalContent={[
                <>
                  <label>Generate secure password:</label>
                  <div className="card">
                    <div className="row expand">
                      <p>Password length: {passwordSize}</p>
                      <input
                        type="range"
                        min={8}
                        max={42}
                        value={passwordSize}
                        onChange={(v) => setPasswordSize(parseInt(v.currentTarget.value))}
                      />
                    </div>
                    <div className="row">
                      <span className="material-icons" onClick={() => setUseNumbers(!useNumbers)}>
                        {useNumbers ? "check_box" : "check_box_outline_blank"}
                      </span>
                      <p>Include numbers</p>
                    </div>
                    <div className="row">
                      <span className="material-icons" onClick={() => setUseCharacters(!useCharacters)}>
                        {useCharacters ? "check_box" : "check_box_outline_blank"}
                      </span>
                      <p>Include special characters</p>
                    </div>
                    <div className="action">
                      <MaterialButton
                        label="Generate"
                        onClick={() => {
                          passwordRef.current!.value = GeneratePassword({
                            length: passwordSize,
                            numbers: useNumbers,
                            symbols: useCharacters,
                          });
                        }}
                        icon="auto_fix_high"
                        type="tonal"
                      />
                    </div>
                  </div>
                </>,
              ]}
              actions={[
                {
                  label: "Confirm",
                  icon: "check",
                  onClick: async () => {
                    let urlInput = urlRef.current!.value.trim();

                    if (nameRef.current!.value.trim() === "") {
                      return false;
                    }

                    if (urlInput !== "") {
                      try {
                        new URL(urlInput);
                      } catch (_) {
                        return false;
                      }
                    }

                    await prepareEncryptedData();
                    return true;
                  }
                },
                {
                  label: "Cancel",
                  icon: "close",
                  type: "tonal",
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
