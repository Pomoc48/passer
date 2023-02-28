import '../scss/widgets/UserProfile.scss';
import { UserCredential } from 'firebase/auth';

function UserProfile(params: {
  signOut: () => void,
  user: UserCredential,
}) {
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
      <p>{params.user.user.displayName}</p>
    </div>
  </>
}

export default UserProfile
