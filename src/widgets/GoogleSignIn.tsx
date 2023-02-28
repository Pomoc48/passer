import GoogleLogo from '../media/google.png';
import '../scss/widgets/GoogleSignIn.scss';

function GoogleSignIn(params: {signIn: () => void}) {

    return <>
      <div className='GoogleSignIn' onClick={params.signIn}>
        <div className='LogoContainer'>
          <img src={GoogleLogo} draggable="false" alt="Google Logo" />
        </div>
        <p>Sign in with Google</p>
      </div>
    </>
}

export default GoogleSignIn
