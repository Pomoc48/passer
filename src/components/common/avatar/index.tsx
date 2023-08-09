import './style.scss';
import { User } from 'firebase/auth';

export default function Avatar(params: { user: User, big?: boolean }) {
  return (
    params.user.photoURL
      ? <img
        className={params.big ? "real-photo big" : "real-photo"}
        src={params.user.photoURL}
        draggable="false"
        alt="Profile"
      />
      : <div className={params.big ? "fake-photo big" : "fake-photo"}>
        {params.user.email![0].toUpperCase()}
      </div>
  );
}
