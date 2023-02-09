import { MouseEventHandler } from 'react';
import GoogleLogo from '../media/google.png';
import '../css/GoogleButton.css';

function GoogleButton(params: { onclick: MouseEventHandler<HTMLDivElement> }) {
  return <>
    <div className='Container' onClick={params.onclick}>
      <div className='Image-Container'>
        <img src={GoogleLogo} draggable="false" alt="Google Logo" />
      </div>
      <p>Sign in with Google</p>
    </div>
  </>
}

export default GoogleButton
