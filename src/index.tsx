import ReactDOM from 'react-dom/client';
import './scss/theme.scss';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { getFirestore } from 'firebase/firestore';
import HomePage from './pages/home';
import ManagerPage from './pages/manager';
import { RequireAuth } from './components/manager/require-auth';
import { UserProvider } from './context/user';
import { KeyProvider } from './context/key';
import { SearchProvider } from './context/search';
import React from 'react';
import ErrorPage from './pages/error';

let matcher = window.matchMedia("(prefers-color-scheme: dark)");
matcher.addEventListener("change", () => updateTheme());

let lightSchemeIcon = document.querySelector("link#light-scheme-icon")!;
let darkSchemeIcon = document.querySelector("link#dark-scheme-icon")!;

export function updateTheme() {
  let systemDefaultTheme = true;
  let themeOverride = localStorage.getItem("theme");

  if (themeOverride === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    systemDefaultTheme = false;
  }

  if (themeOverride === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    systemDefaultTheme = false;
  }

  if (matcher.matches) {
    document.head.append(darkSchemeIcon);
    lightSchemeIcon.remove();

    if (systemDefaultTheme) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  } else {
    document.head.append(lightSchemeIcon);
    darkSchemeIcon.remove();

    if (systemDefaultTheme) {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
}

function getFirebaseConfig(): FirebaseOptions {
  let apiKey = localStorage.getItem('apiKey');
  let projectId = localStorage.getItem('projectId');
  let appId = localStorage.getItem('appId');

  if (apiKey === null || projectId === null || appId === null) {
    return {
      apiKey: process.env.REACT_APP_API_KEY,
      projectId: process.env.REACT_APP_PROJECT_ID,
      appId: process.env.REACT_APP_APP_ID,
    };
  }

  return { apiKey, projectId, appId };
}

declare global {
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
}

function enableAppCheck() {
  let reCaptchaKey = localStorage.getItem("reCaptchaKey");

  if (reCaptchaKey === null) {
    if (process.env.NODE_ENV !== 'production') {
      window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }

    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(process.env.REACT_APP_RECAPTCHA_SITE_KEY!),
      isTokenAutoRefreshEnabled: true
    });

    return;
  }

  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(reCaptchaKey),
    isTokenAutoRefreshEnabled: true
  });
}

const app = initializeApp(getFirebaseConfig());
const db = getFirestore(app);

updateTheme();
enableAppCheck();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/manager",
    element: <RequireAuth redirectTo="/">
      <SearchProvider>
        <ManagerPage db={db} />
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
