import '../scss/widgets/PasswordCard.scss'
import { SiteData } from '../types/SiteData'

export default function PasswordCard(params: {website: SiteData}) {
  
  return (
    <div className='PasswordCard'>
      <div className='Name'>{params.website.name}</div>
      <div className='Info'>
        <div>{params.website.url}</div>
        <div>{params.website.username}</div>
      </div>

      <div className='Actions'>
        <button type='button'>Visit</button>
        <button type='button'>Copy</button>
      </div>
    </div>
  );
}
