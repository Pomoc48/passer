import { DialogParameters } from '../../types/DialogParameters';
import './style.scss';

export default function MaterialDialog(params: DialogParameters) {
  return <>
    <div className="Scrim" onClick={params.closeFunction}/>
    <div className="Dialog">
      <div className='Title'>{params.title}</div>
      <div className='Content'>{params.content}</div>
      <div className='Actions'>
        {
          params.actions.map((action, index) => {
            return <button key={index} type='button' className='label-large' onClick={action.onClick}>{action.name}</button>
          })
        }
      </div>
    </div>
  </>
}
