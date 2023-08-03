import './style.scss';
import { User } from 'firebase/auth';

export default function Avatar(params: { user: User }) {
  return (
    params.user.photoURL
      ? <img
        className='real-photo'
        src={params.user.photoURL}
        draggable="false"
        alt="Profile"
      />
      : <div className="fake-photo">
        {params.user.email![0].toUpperCase()}
      </div>
  );
}
