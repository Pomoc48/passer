import './style.css';

export default function Navbar({children} : any) {
  return (
    <header>
      <h1 className='headline-small on-surface-text'>Passer</h1>
      {children}
    </header>
  );
}
