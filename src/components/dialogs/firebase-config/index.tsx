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

  useEffect(() => {
    projectIdRef.current!.value = localStorage.getItem('projectId') ?? "";
    webApiKeyRef.current!.value = localStorage.getItem('apiKey') ?? "";
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
        <div />,
      ]}
      actions={[
        {
          label: "Save",
          icon: "check",
          onClick: async () => {
            let projectId = projectIdRef.current!.value.trim();
            let webApiKey = webApiKeyRef.current!.value.trim();

            if (projectId === "" || webApiKey === "") {
              params.notify("All fields are required");
              return false;
            }

            localStorage.setItem("projectId", projectId);
            localStorage.setItem("apiKey", webApiKey);

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
