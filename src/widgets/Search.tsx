import { UserCredential } from 'firebase/auth';
import { MouseEventHandler } from 'react';
import '../scss/widgets/Search.scss';

function Search(params: {
  user: UserCredential,
  signOut: MouseEventHandler<HTMLDivElement>,
}) {

  let image: string | undefined;

  if (params.user.user.photoURL === null) {
    image = undefined;
  } else {
    image = params.user.user.photoURL;
    console.log(image);
  }

  return <div className="Search">
    <span className="material-icons">search</span>
    <div>
      <input placeholder='Search passwords' />
    </div>
    <img onClick={params.signOut} src={image} draggable="false" alt="Profile" />
  </div>
}

export default Search
