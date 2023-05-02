import { GoogleAuthProvider, UserCredential, getAuth, signInWithPopup } from 'firebase/auth';
import GoogleLogo from '../../assets/google.png';
import './style.scss';
import { useGoogleUser } from '../../context/UserProvider';
import { useNavigate } from 'react-router-dom';

export default function GoogleSignIn() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  
  const { update } = useGoogleUser();
  const navigate = useNavigate();
  
  function signUserIn() {
    signInWithPopup(auth, provider).then((result: UserCredential) => {
      update(result);
      navigate("/manager");

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
