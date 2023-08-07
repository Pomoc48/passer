import '../home/style.scss';
import Navbar from '../../components/common/navbar';
import { useNavigate } from 'react-router-dom';
import MaterialButton from '../../components/common/button';

export default function ErrorPage() {
  const navigate = useNavigate();

  return <>
    <Navbar />
    <main>
      <section>
        <h1>Error</h1>
        <p>
          The page you were trying to reach is not available or doesn't exist. Check the address bar or go back to the home page.
        </p>
        <div className="buttons">
          <MaterialButton
            label='Home page'
            icon='home'
            type='tonal'
            onClick={() => navigate("/")}
          />
        </div>
      </section>
    </main>
  </>
}
