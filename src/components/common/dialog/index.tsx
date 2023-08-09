import { useEffect } from 'react';
import { DialogProps } from '../../../types/dialogProps';
import './style.scss';
import MaterialButton from '../button';

export default function MaterialDialog(params: DialogProps) {
  useEffect(() => {
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

  let dialogClasses = "dialog " + params.class;

  if (params.extraWide) {
    dialogClasses += " extra-wide";
  }

  return <>
    <div className="scrim" onClick={params.dismissible ? close : undefined} />
    <div className={dialogClasses}>
      {params.title ? <h3>{params.title}</h3> : null}
      <div className="flow-container">
        <div className='content'>
          {params.content.map((content, i) => <div key={i}>{content}</div>)}
        </div>
        {
          params.additionalContent !== undefined
            ? <div className='content'>
              {params.additionalContent.map((content, i) => <div key={i}>{content}</div>)}
            </div>
            : null
        }
      </div>
      {
        params.actions.length > 0
          ? <div className='actions'>
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
                />
              })
            }
          </div>
          : null
      }
    </div>
  </>
}
