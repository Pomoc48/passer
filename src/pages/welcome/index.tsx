import './style.scss';
import Padlock from '../../media/padlock.png';
import Key from '../../media/key.png';
import Magnify from '../../media/magnify.png';
import Navbar from '../../components/navbar';
import GoogleSignIn from '../../components/google-login';

export default function WelcomePage() {
  return <>
    <Navbar>
      <GoogleSignIn/>
    </Navbar>
    <div className="Marketing">
      <div className="SectionContainer Welcome">
        <section>
          <img src={Padlock} alt="Padlock" />
          <div className="Texts">
            <div className='Title'>Passer</div>
            <div className='Info'>Open-source password manager, presented by Mikołaj Łukawski. The solution for all your password storing related problems.</div>
          </div>
        </section>
      </div>
      <div className="SectionContainer">
        <section>
          <div className="Texts">
            <div className='Title'>Secure</div>
            <div className='Info'>Your passwords and all site data are client-side encrypted, before being safely stored on the database. The encryption/decryption key is generated locally using your master password and never leaves your device.</div>
          </div>
          <img src={Key} alt="Key" />
        </section>
      </div>
      <div className="SectionContainer">
        <section>
          <img src={Magnify} alt="Key" />
          <div className="Texts">
            <div className='Title'>Transparent</div>
            <div className='Info'>The source code is fully available with it's documentation and step by step instructions in the GitHub repo, and the entire solution is easily self-hostable using the free tier of Firebase.</div>
          </div>
        </section>
      </div>
    </div>
  </>
}
