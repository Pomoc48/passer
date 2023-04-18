import { UserCredential } from 'firebase/auth';
import '../scss/views/TopBar.scss';
import GoogleSignIn from '../widgets/GoogleSignIn';
import Search from '../widgets/Search';

export default function TopBar(params: {
  user: UserCredential | null,
  signIn: () => void,
  signOut: () => void,
}) {
  
  let content: JSX.Element;

  if (params.user === null) {
    content = <GoogleSignIn signIn={params.signIn} />
  } else {
    content = <Search user={params.user} signOut={params.signOut} />;
  }

  return (
    <div className='TopBar'>
      <p>Passer</p>
      {content}
    </div>
  );
}
