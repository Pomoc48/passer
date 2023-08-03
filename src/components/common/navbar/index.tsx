import './style.scss';

export default function Navbar({ children }: any) {
  return (
    <header>
      <h1>Passer</h1>
      <div className="container">
        {children}
      </div>
    </header>
  );
}
