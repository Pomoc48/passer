import '../scss/widgets-common/Dialog.scss';
import { DialogParameters } from '../types/DialogParameters';

export default function Dialog(params: DialogParameters) {
  return (
    <div className="Dialog">
      <div className='Title'>{params.title}</div>
      <div className='Content'>{params.content}</div>
      <div className='Actions'>
        { params.actions.map((action, index) => action.name) }
      </div>
    </div>
  );
}
