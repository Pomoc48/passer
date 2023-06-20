import { useEffect } from 'react';
import { DialogParameters } from '../../types/dialogParameters';
import './style.css';
import MaterialButton from '../button';

export default function MaterialDialog(params: DialogParameters) {
  useEffect(() => {
    let root = document.querySelector(':root')! as HTMLElement;
    root.style.setProperty(
      '--dialog-width',
      params.maxWidth === undefined ? "500px" : params.maxWidth + 'px',
    );

    setTimeout(() => {
      document.getElementsByClassName("dialog")[0].classList.add("open");
      document.getElementsByClassName("scrim")[0].classList.add("open");
    }, 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function close() {
    if (params.closeFunction !== null) {
      document.getElementsByClassName("dialog")[0].classList.remove("open");
      document.getElementsByClassName("scrim")[0].classList.remove("open");

      setTimeout(() => params.closeFunction!(), 300);
    }
  }

  return <>
    <div className="scrim" onClick={params.dismissible ? close : undefined} />
    <div className={"dialog " + params.class}>
      <h3 className='title-large'>{params.title}</h3>
      <div className="flow-container">
        <div className='content body-medium'>
          {params.content.map((content, i) => <div key={i}>{content}</div>)}
        </div>
        {
          params.additionalContent !== undefined
            ? <div className='content body-medium'>
              {params.additionalContent.map((content, i) => <div key={i}>{content}</div>)}
            </div>
            : null
        }
      </div>
      <div className='actions'>
        {
          params.actions.map((action, index) => {
            return <MaterialButton
              key={index}
              label={action.label}
              onClick={
                action.onClick === undefined
                  ? close
                  : async () => {
                    if (await action.onClick!()) {
                      close();
                    }
                  }
              }
              icon={action.icon}
              type={action.type}
              isError={action.isError}
            />
          })
        }
      </div>
    </div>
  </>
}
