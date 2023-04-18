import '../scss/widgets/Marketing.scss';

export default function Marketing() {
  return (
    <div className="Marketing">
      <div className='Title'>Open-source password manager</div>
      <div className='Subtitle'>presented by Mikołaj Łukawski</div>
      <div className='Info'>Your passwords are client-side encrypted before being sent to the Firebase Firestore database</div>
    </div>
  );
}
