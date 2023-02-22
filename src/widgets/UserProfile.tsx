import { MouseEventHandler } from 'react';
import '../scss/widgets/UserProfile.scss';
import { UserCredential } from 'firebase/auth';
import GoogleSignIn from './GoogleSignIn';

function UserProfile(params: {
  signIn: MouseEventHandler<HTMLDivElement>,
  signOut: MouseEventHandler<HTMLDivElement>,
  user: UserCredential | null,
}) {

  if (params.user === null) {
    return <GoogleSignIn signIn={params.signIn} />
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
      <img src={image} draggable="false" alt="Profile" />
      <p style={{marginLeft: "10px"}}>{params.user.user.displayName}</p>
    </div>
  </>
}

export default UserProfile
