import { DialogParameters } from '../../types/DialogParameters';
import './style.css';

export default function MaterialDialog(params: DialogParameters) {
  return <>
    <div className="scrim" onClick={params.closeFunction}/>
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
