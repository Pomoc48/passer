import { UserCredential } from 'firebase/auth';
import { MouseEventHandler } from 'react';
import '../scss/widgets/TopBar.scss';
import UserProfile from './UserProfile';

function TopBar(params: {
  user: UserCredential | null,
  signIn: MouseEventHandler<HTMLDivElement>,
  signOut: MouseEventHandler<HTMLDivElement>,
}) {

  return <div className='TopBar'>
    <p>Passer</p>
    <div className='Spacer' />
    {params.user === null ? null : <input placeholder='Search passwords' />}
    <UserProfile user={params.user} signIn={params.signIn} signOut={params.signOut} />
  </div>
}

export default TopBar
