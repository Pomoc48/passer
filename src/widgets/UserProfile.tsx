import { MouseEventHandler } from 'react';
import GoogleLogo from '../media/google.png';
import '../css/UserProfile.css';
import { UserCredential } from 'firebase/auth';

function UserProfile(params: {
  signIn: MouseEventHandler<HTMLDivElement>,
  signOut: MouseEventHandler<HTMLDivElement>,
  user: UserCredential | null,
}) {

  if (params.user === null) {
    return <>
      <div className='UserProfile' onClick={params.signIn}>
        <div className='LogoContainer'>
          <img src={GoogleLogo} draggable="false" alt="Google Logo" />
        </div>
        <p>Sign in with Google</p>
      </div>
    </>
  }

  let image: string | undefined;

  if (params.user.user.photoURL === null) {
    image = undefined;
  } else {
    image = params.user.user.photoURL;
    console.log(image);
  }

  return <>
    <div className='UserProfile' onClick={params.signOut}>
      <img src={image} alt="Profile" />
      <p>{params.user.user.displayName}</p>
    </div>
  </>
}

export default UserProfile
