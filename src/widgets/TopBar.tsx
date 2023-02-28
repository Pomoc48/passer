import { UserCredential } from 'firebase/auth';
import '../scss/widgets/TopBar.scss';
import GoogleSignIn from './GoogleSignIn';
import Search from './Search';

function TopBar(params: {
  user: UserCredential | null,
  signIn: () => void,
  signOut: () => void,
}) {
  let content;

  if (params.user === null) {
    content = <GoogleSignIn signIn={params.signIn} />
  }

  else {
    let image: string | undefined;

    if (params.user.user.photoURL === null) {
      image = undefined;
    } else {
      image = params.user.user.photoURL;
      console.log(image);
    }

    content = <>
      <Search user={params.user} signOut={params.signOut} />
    </> ;
  }

  return <div className='TopBar'>
    <p>Passer</p>
    <div className='Spacer' />
    {content}
  </div>
}

export default TopBar
