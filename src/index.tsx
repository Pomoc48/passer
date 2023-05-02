import ReactDOM from 'react-dom/client';
import './index.scss';
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getFirestore } from 'firebase/firestore';
import WelcomePage from './pages/welcome';
import { UserProvider } from './context/UserProvider';
import PasswordsPage from './pages/passwords';

const firebaseConfig = {
  apiKey: "AIzaSyC6v6N8InH2SNyjoGnfgQ_DPmV2Xw30f4k",
  authDomain: "pass-9f64b.firebaseapp.com",
  projectId: "pass-9f64b",
  storageBucket: "pass-9f64b.appspot.com",
  messagingSenderId: "31474752244",
  appId: "1:31474752244:web:68a51225edf4bc9786dca1",
  measurementId: "G-S9TYFLCXWG"
};

const app = initializeApp(firebaseConfig);

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LcRunAkAAAAAB4FgijGqmLFKlwg4L4eFmerB_CQ'),
  isTokenAutoRefreshEnabled: true
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const db = getFirestore(app);

const router = createBrowserRouter([
  {
    path: "/",
    element: <WelcomePage />,
    errorElement: <div>404</div>,
  },
  {
    path: "/passwords",
    element: <UserProvider>
      <PasswordsPage db={db} />
    </UserProvider>,
  },
]);

root.render(
  <RouterProvider router={router} />
);
