import { DialogProps } from '../../../types/dialogProps';
import './style.scss';
import MaterialButton from '../button';
import { useState } from 'react';

export default function MaterialDialog(params: DialogProps) {
  const [closed, setClosed] = useState(false);

  function close() {
    if (params.closeFunction !== null) {
      setTimeout(() => params.closeFunction!(), 300);
      setClosed(true);
    }
  }

  let dialogClasses = "dialog " + params.class;

  if (params.extraWide) {
    dialogClasses += " extra-wide";
  }

  return <>
    <div
      className="scrim"
      onClick={params.dismissible ? close : undefined}
      style={closed ? { animation: "fade-out 0.3s forwards" } : undefined}
    />
    <div
      className={dialogClasses}
      style={closed ? { animation: "fade-out 0.3s forwards" } : undefined}
    >
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
                  confirmation={action.confirmation}
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
