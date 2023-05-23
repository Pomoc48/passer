import './style.css';
import Navbar from '../../components/navbar';
import GoogleSignIn from '../../components/google-login';

export default function WelcomePage() {
  return <>
    <Navbar>
      <GoogleSignIn/>
    </Navbar>
    <main>
      <div className="section-container">
        <section>
          <span className="material-icons">password</span>
          <div className="text">
            <h2 className='primary-text display-large'>Passer</h2>
            <p className='body-large'>Open-source password manager, presented by Mikołaj Łukawski. The solution for all your password storing related problems.</p>
          </div>
        </section>
      </div>
      <div className="section-container">
        <section>
          <div className="text">
            <h3 className='primary-text headline-large'>Secure</h3>
            <p className='body-large'>Your passwords and all site data are client-side encrypted, before being safely stored on the database. The encryption/decryption key is generated locally using your master password and never leaves your device.</p>
          </div>
          <span className="material-icons">lock_outline</span>
        </section>
      </div>
      <div className="section-container">
        <section>
          <span className="material-icons">code</span>
          <div className="text">
            <h3 className='primary-text headline-large'>Transparent</h3>
            <p className='body-large'>The source code is fully available with it's documentation and step by step instructions in the GitHub repo, and the entire solution is easily self-hostable using the free tier of Firebase.</p>
          </div>
        </section>
      </div>
    </main>
  </>
}
