import { useEffect } from 'react';
import { DialogParameters } from '../../types/dialogParameters';
import './style.css';

export default function MaterialDialog(params: DialogParameters) {
  useEffect(() => {
    setTimeout(() => {
      document.getElementsByClassName("dialog")[0].classList.add("open");
      document.getElementsByClassName("scrim")[0].classList.add("open");
    }, 1);
  }, []);

  return <>
    <div
      className="scrim"
      onClick={() => {
        document.getElementsByClassName("dialog")[0].classList.remove("open");
        document.getElementsByClassName("scrim")[0].classList.remove("open");
        setTimeout(() => {
          params.closeFunction();
        }, 300);
      }}
    />
    <div className="dialog">
      <h3 className='title-large'>{params.title}</h3>
      <div className='content body-medium'>{params.content}</div>
      <div className='actions'>
        {
          params.actions.map((action, index) => {
            return <button key={index} type='button' className='label-large clickable' onClick={action.onClick}>{action.name}</button>
          })
        }
      </div>
    </div>
  </>
}
