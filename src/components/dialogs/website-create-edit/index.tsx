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

  const [useNumbers, setUseNumbers] = useState(true);
  const [useCharacters, setUseCharacters] = useState(true);
  const [passwordSize, setPasswordSize] = useState(24);

  useEffect(() => {
    if (params.website) {
      nameRef.current!.value = params.website.data.name;
      urlRef.current!.value = params.website.data.url ?? "";
      usernameRef.current!.value = params.website.data.username ?? "";
      passwordRef.current!.value = params.website.data.password ?? "";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function createWebsite() {
    const data = {
      name: nameRef.current!.value.trim(),
      password: passwordRef.current!.value.trim(),
      url: urlRef.current!.value.trim(),
      username: usernameRef.current!.value.trim(),
    };

    const serialized = JSON.stringify(data);
    const encrypted = await encrypt(cryptoKey, serialized);

    const uploadData: UploadData = {
      uuid: null,
      websiteData: encrypted,
      favorite: false,
      time: {
        created: new Date(),
        modified: new Date(),
      }
    }

    await dbInsert(params.reference, uploadData);
    params.notify("New password successfully added");
  }

  async function updateWebsite() {
    const data = {
      name: nameRef.current!.value.trim(),
      password: passwordRef.current!.value.trim(),
      url: urlRef.current!.value.trim(),
      username: usernameRef.current!.value.trim(),
    };

    const serialized = JSON.stringify(data);
    const encrypted = await encrypt(cryptoKey, serialized);

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
          <label>Name:</label>
          <MaterialInput
            placeholder="Example Website"
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
          <label>Generate secure password:</label>
          <MaterialInput
            placeholder="Secret notes, recovery keys"
            type="text"
            isMultiline={true}
          />
        </>,
      ]}
      actions={[
        {
          label: "Confirm",
          icon: "check",
          onClick: async () => {
            if (nameRef.current!.value.trim() === "") {
              params.notify("Please enter a valid name");
              return false;
            }

            let urlInput = urlRef.current!.value.trim();

            if ((urlInput !== "") && (!isUrlValid(urlInput))) {
              params.notify("Provided URL is not valid");
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
