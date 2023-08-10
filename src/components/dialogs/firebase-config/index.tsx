import { useEffect, useRef } from 'react';
import { MaterialInput } from '../../../components/common/input';
import MaterialDialog from '../../../components/common/dialog';

export default function FirebaseConfigDialog(
  params: {
    notify: (message: string, long?: boolean) => void,
    closeDialog: () => void,
  }
) {
  const projectIdRef = useRef<HTMLInputElement | null>(null);
  const webApiKeyRef = useRef<HTMLInputElement | null>(null);
  const appIdRef = useRef<HTMLInputElement | null>(null);
  const reCaptchaRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    projectIdRef.current!.value = localStorage.getItem('projectId') ?? "";
    webApiKeyRef.current!.value = localStorage.getItem('apiKey') ?? "";
    appIdRef.current!.value = localStorage.getItem('appId') ?? "";
    reCaptchaRef.current!.value = localStorage.getItem('reCaptchaKey') ?? "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MaterialDialog
      class='firebase-config'
      title="Configure your Firebase instance"
      closeFunction={params.closeDialog}
      dismissible={true}
      content={[
        <>
          <label>Project ID:</label>
          <MaterialInput
            placeholder="pass-9f64b"
            type="text"
            ref={projectIdRef}
          />
        </>,
        <>
          <label>Web API key:</label>
          <MaterialInput
            placeholder="AIzaSyC6v6N8InH2SNyjoGnfgQ_DPmV2Xw30f4k"
            type="text"
            ref={webApiKeyRef}
          />
        </>,
        <>
          <label>App ID:</label>
          <MaterialInput
            placeholder="1:31474752244:web:68a51225edf4bc9786dca1"
            type="text"
            ref={appIdRef}
          />
        </>,
        <>
          <label>reCaptcha site key:</label>
          <MaterialInput
            placeholder="6Ldb4G0nAAAAAEeiedI4xSCeeAXq_xqz0kiLKCV_"
            type="text"
            ref={reCaptchaRef}
          />
        </>,
        <div />,
      ]}
      actions={[
        {
          label: "Save",
          icon: "check",
          onClick: async () => {
            let projectId = projectIdRef.current!.value.trim();
            let webApiKey = webApiKeyRef.current!.value.trim();
            let appId = appIdRef.current!.value.trim();
            let reCaptcha = reCaptchaRef.current!.value.trim();

            if (projectId === "" || webApiKey === "" || appId === "" || reCaptcha === "") {
              params.notify("All fields are required");
              return false;
            }

            localStorage.setItem("projectId", projectId);
            localStorage.setItem("apiKey", webApiKey);
            localStorage.setItem("appId", appId);
            localStorage.setItem("reCaptchaKey", reCaptcha);

            window.location.reload();
            return true;
          }
        },
        {
          label: "Clear",
          icon: "delete",
          type: "error",
          confirmation: true,
          onClick: async () => {
            localStorage.clear();

            window.location.reload();
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
