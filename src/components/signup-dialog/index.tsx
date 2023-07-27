import { GoogleAuthProvider, UserCredential, getAuth, signInWithPopup } from 'firebase/auth';
import GoogleLogo from '../../assets/google.png';
import './style.css';
import { useGoogleUser } from '../../context/userProvider';
import { useNavigate } from 'react-router-dom';
import MaterialButton from '../button';

export default function SignUpButton() {
  // const provider = new GoogleAuthProvider();
  // const auth = getAuth();

  // const { update } = useGoogleUser();
  // const navigate = useNavigate();

  return (
    <MaterialButton
      label='Create new account'
      onClick={() => { }}
      icon='person_add'
      type='filled'
    />
  );
}
