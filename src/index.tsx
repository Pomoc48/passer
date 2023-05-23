import ReactDOM from 'react-dom/client';
import './index.css';
import { initializeApp } from 'firebase/app';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getFirestore } from 'firebase/firestore';
import WelcomePage from './pages/welcome';
import PasswordsPage from './pages/passwords';
import { RequireAuth } from './pages/passwords/extra/RequireAuth';
import { UserProvider } from './context/userProvider';

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
    path: "/manager",
    element: <RequireAuth redirectTo="/">
      <PasswordsPage db={db} />
    </RequireAuth>,
  },
]);

root.render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
