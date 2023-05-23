import { GoogleAuthProvider, UserCredential, getAuth, signInWithPopup } from 'firebase/auth';
import GoogleLogo from '../../assets/google.png';
import './style.css';
import { useGoogleUser } from '../../context/userProvider';
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
    <div className='google-sign-in clickable' onClick={signUserIn}>
      <div className='logo-container'>
        <img src={GoogleLogo} draggable="false" alt="Google Logo" width={16} />
      </div>
      <p>Sign in with Google</p>
    </div>
  );
}
