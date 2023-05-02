import { GoogleAuthProvider, UserCredential, getAuth, signInWithPopup } from 'firebase/auth';
import GoogleLogo from '../../assets/google.png';
import './style.scss';
import { useGoogleUserUpdate } from '../../context/UserProvider';

export default function GoogleSignIn() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  
  const userUpdater = useGoogleUserUpdate();
  
  function signUserIn() {
    signInWithPopup(auth, provider).then((result: UserCredential) => {
      userUpdater(result);
      window.location.href = "/passwords";

    }).catch((error) => {
      console.log(error.message);
    });
  }
  
  return (
    <div className='GoogleSignIn' onClick={signUserIn}>
      <div className='LogoContainer'>
        <img src={GoogleLogo} draggable="false" alt="Google Logo" />
      </div>
      <p>Sign in with Google</p>
    </div>
  );
}
