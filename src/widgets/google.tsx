import { MouseEventHandler } from 'react';
import googleLogo from '../media/google.png';
import '../css/GoogleButton.css';

function GoogleButton(params: { onclick: MouseEventHandler<HTMLDivElement> }) {
  return <>
    <div className='Container' onClick={params.onclick}>
      <div className='Image-Container'>
        <img src={googleLogo} />
      </div>
      <p>Sign in with Google</p>
    </div>
  </>
}

export default GoogleButton
