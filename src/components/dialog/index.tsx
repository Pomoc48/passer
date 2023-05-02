import { DialogParameters } from '../../types/DialogParameters';
import MaterialButton from '../button';
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
            return <MaterialButton key={index} name={action.name} onClick={action.onClick} />
          })
        }
      </div>
    </div>
  </>
}
