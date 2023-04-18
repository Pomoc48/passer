import '../scss/widgets/PasswordCard.scss'
import { Password } from '../types/Password'

export default function PasswordCard(params: {password: Password}) {
  
  return (
    <div className='PasswordCard'>
      <div className='Name'>{params.password.name}</div>
      <div className='Info'>
        <div>{params.password.website}</div>
        <div>{params.password.username}</div>
      </div>

      <div className='Actions'>
        <button type='button'>Visit</button>
        <button type='button'>Copy</button>
      </div>
    </div>
  );
}
