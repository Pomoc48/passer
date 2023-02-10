import { UserCredential } from 'firebase/auth';
import { MouseEventHandler } from 'react';
import '../css/TopBar.css';
import UserProfile from './UserProfile';

function TopBar(params: {
  user: UserCredential | null,
  signIn: MouseEventHandler<HTMLDivElement>,
  signOut: MouseEventHandler<HTMLDivElement>,
}) {

  return <div className='TopBar'>
    <UserProfile user={params.user} signIn={params.signIn} signOut={params.signOut} />
  </div>
}

export default TopBar
