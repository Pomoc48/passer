import '../scss/widgets/PasswordCard.scss'
import { SiteData } from '../types/SiteData'
import MaterialButton from '../widgets-common/Button';

export default function PasswordCard(params: {website: SiteData}) {
  
  return (
    <div className='PasswordCard'>
      <div className='Name'>{params.website.name}</div>
      <div className='Info'>
        <div>{params.website.url}</div>
        <div>{params.website.username}</div>
      </div>

      <div className='Actions'>
        <MaterialButton name='Visit' onClick={() => {}}/>
        <MaterialButton name='Copy' onClick={() => {}}/>
      </div>
    </div>
  );
}
