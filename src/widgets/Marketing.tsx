import '../scss/widgets/Marketing.scss';
import Padlock from '../media/padlock.png';
import Key from '../media/key.png';

export default function Marketing() {
  return (
    <div className="Marketing">
      <section>
        <img src={Padlock} alt="Padlock" />
        <div className="Texts">
          <div className='Title'>Passer</div>
          <div className='Info'>Open-source password manager, presented by Mikołaj Łukawski. The solution for all your password storing related problems.</div>
        </div>
      </section>
      <div className="separator"/>
      <section>
        <div className="Texts">
          <div className='Title'>Secure</div>
          <div className='Info'>Your passwords and all site data are client-side encrypted, using your master password, before being stored on the database.</div>
        </div>
        <img src={Key} alt="Key" />
      </section>
      <div className="separator"/>
      <section>
        <img src={Padlock} alt="Key" />
        <div className="Texts">
          <div className='Title'>Transparent</div>
          <div className='Info'>Source code is fully available in the GitHub repo, and the entire solution is easily self-hostable using the free tier of Firebase.</div>
        </div>
      </section>
    </div>
  );
}
