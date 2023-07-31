import ReactDOM from 'react-dom/client';
import './index.css';
import { initializeApp } from 'firebase/app';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getFirestore } from 'firebase/firestore';
import WelcomePage from './pages/welcome';
import PasswordsPage from './pages/passwords';
import { RequireAuth } from './pages/passwords/extra/RequireAuth';
import { UserProvider } from './context/userProvider';
import { KeyProvider } from './context/cryptoKey';
import { SearchProvider } from './context/searchProvider';
import React from 'react';

let matcher = window.matchMedia("(prefers-color-scheme: dark)");

matcher.addEventListener("change", () => onUpdate());

let lightSchemeIcon = document.querySelector("link#light-scheme-icon");
let darkSchemeIcon = document.querySelector("link#dark-scheme-icon");

function onUpdate() {
  if (lightSchemeIcon === null || darkSchemeIcon === null) {
    return;
  }

  if (matcher.matches) {
    document.head.append(darkSchemeIcon);
    lightSchemeIcon.remove();
  } else {
    document.head.append(lightSchemeIcon);
    darkSchemeIcon.remove();
  }
}

onUpdate();

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
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
      <SearchProvider>
        <PasswordsPage db={db} />
      </SearchProvider>
    </RequireAuth>,
  },
]);

root.render(
  <React.StrictMode>
    <UserProvider>
      <KeyProvider>
        <RouterProvider router={router} />
      </KeyProvider>
    </UserProvider>
  </React.StrictMode>
);
