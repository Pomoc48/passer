import '../scss/widgets/Marketing.scss';
import Padlock from '../media/padlock.png';

export default function Marketing() {
  return (
    <div className="Marketing">
      <img src={Padlock} alt="Padlock" />
      <div className="Texts">
        <div className='Title'>Open-source password manager</div>
        <div className='Subtitle'>presented by Mikołaj Łukawski</div>
        <div className='Info'>Your passwords and site details are client-side encrypted. Everything can be self-hosted.</div>
      </div>
    </div>
  );
}
