import { CollectionReference } from "firebase/firestore"
import { encrypt } from "../../../functions/crypto";
import { dbInsert, dbUpdate } from "../../../functions/firestore";
import { UploadData } from "../../../types/uploadData";
import { useCryptoKey } from "../../../context/key";
import { useEffect, useRef, useState } from "react";
import MaterialDialog from "../../common/dialog";
import { GeneratePassword } from "js-generate-password";
import MaterialButton from "../../common/button";
import "./style.scss";
import { MaterialInput } from "../../common/input";
import { Website } from "../../../types/website";
import { isUrlValid } from "../../../functions/utils";

export default function CreateEditWebsiteDialog(
  params: {
    reference: CollectionReference,
    notify: (message: string) => void,
    closeDialog: () => void,
    website?: Website,
  },
) {
  const cryptoKey = useCryptoKey().key!;

  const nameRef = useRef<HTMLInputElement | null>(null);
  const urlRef = useRef<HTMLInputElement | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const noteRef = useRef<HTMLTextAreaElement | null>(null);

  const [useNumbers, setUseNumbers] = useState(true);
  const [useCharacters, setUseCharacters] = useState(true);
  const [passwordSize, setPasswordSize] = useState(24);

  useEffect(() => {
    if (params.website) {
      nameRef.current!.value = params.website.data.name;
      urlRef.current!.value = params.website.data.url ?? "";
      usernameRef.current!.value = params.website.data.username ?? "";
      passwordRef.current!.value = params.website.data.password ?? "";
      noteRef.current!.value = params.website.data.note ?? "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function serializeData(): string {
    const data = {
      name: nameRef.current!.value.trim(),
      password: passwordRef.current!.value.trim(),
      url: urlRef.current!.value.trim(),
      username: usernameRef.current!.value.trim(),
      note: noteRef.current!.value.trim(),
    };

    return JSON.stringify(data);
  }

  async function createWebsite() {
    const encrypted = await encrypt(cryptoKey, serializeData());
    const nowDate = new Date();

    const uploadData: UploadData = {
      uuid: null,
      websiteData: encrypted,
      favorite: false,
      time: {
        created: nowDate,
        modified: nowDate,
      }
    }

    await dbInsert(params.reference, uploadData);
    params.notify("New password successfully added");
  }

  async function updateWebsite() {
    const encrypted = await encrypt(cryptoKey, serializeData());

    const uploadData: UploadData = {
      uuid: params.website!.uuid,
      websiteData: encrypted,
      favorite: false,
      time: {
        created: params.website!.time.created,
        modified: new Date(),
      }
    }

    await dbUpdate(params.reference, uploadData);
    params.notify("Password successfully updated");
  }

  return (
    <MaterialDialog
      class="new"
      title={params.website ? "Edit password" : "Create password"}
      extraWide={true}
      dismissible={true}
      closeFunction={params.closeDialog}
      content={[
        <>
          <label>Name</label>
          <MaterialInput
            placeholder="Example Website"
            type="text"
            ref={nameRef}
            onSubmit={() => urlRef.current!.focus()}
          />
        </>,
        <>
          <label>Website URL</label>
          <MaterialInput
            placeholder="https://www.example.com/"
            type="url"
            ref={urlRef}
            onSubmit={() => usernameRef.current!.focus()}
          />
        </>,
        <>
          <label>Username / e-mail</label>
          <MaterialInput
            placeholder="johnSmith94"
            type="text"
            ref={usernameRef}
            onSubmit={() => passwordRef.current!.focus()}
          />
        </>,
        <>
          <label>Password</label>
          <MaterialInput
            placeholder="0pX<W=gGTZoVRWqIoCMZ"
            type="text"
            ref={passwordRef}
            onSubmit={() => noteRef.current!.focus()}
          />
        </>,
      ]}
      additionalContent={[
        <>
          <label>Generate secure password</label>
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
              <span className="material-symbols-outlined" onClick={() => setUseNumbers(!useNumbers)}>
                {useNumbers ? "check_box" : "check_box_outline_blank"}
              </span>
              <p>Include numbers</p>
            </div>
            <div className="row">
              <span className="material-symbols-outlined" onClick={() => setUseCharacters(!useCharacters)}>
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
                type="text"
                outline={true}
                confirmation={params.website !== undefined}
              />
            </div>
          </div>
        </>,
        <>
          <label>Attach a note</label>
          <MaterialInput
            placeholder="Secret message, recovery keys"
            type="text"
            isMultiline={true}
            ref={noteRef}
          />
        </>,
      ]}
      actions={[
        {
          label: "Confirm",
          icon: "check",
          onClick: async () => {
            let name = nameRef.current!.value.trim();
            let username = usernameRef.current!.value.trim();
            let password = passwordRef.current!.value.trim();
            let note = noteRef.current!.value.trim();

            if (name === "") {
              params.notify("Please enter a valid name");
              return false;
            }

            if (name.length > 32) {
              params.notify("Website name is too long");
              return false;
            }

            let urlInput = urlRef.current!.value.trim();

            if ((urlInput !== "") && (!isUrlValid(urlInput))) {
              params.notify("Provided URL is not valid");
              return false;
            }

            if (urlInput.length > 256) {
              params.notify("Website URL is too long");
              return false;
            }

            if (username.length > 64) {
              params.notify("Username is too long");
              return false;
            }

            if (password.length > 128) {
              params.notify("Password is too long");
              return false;
            }

            if (note.length > 2048) {
              params.notify("Note is too long");
              return false;
            }

            if (params.website) {
              await updateWebsite();
            } else {
              await createWebsite();
            }

            return true;
          }
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
