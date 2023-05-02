import './style.scss';

export default function Navbar({children} : any) {
  return (
    <div className='Navbar'>
      <p>Passer</p>
      {children}
    </div>
  );
}