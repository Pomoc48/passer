import ReactDOM from 'react-dom/client';
import './scss/theme.scss';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

  if (apiKey === null || projectId === null) {
    if (process.env.REACT_APP_PROJECT_ID === "pass-9f64b") {
      return {
        apiKey: process.env.REACT_APP_API_KEY,
        projectId: process.env.REACT_APP_PROJECT_ID,
        appId: "1:31474752244:web:68a51225edf4bc9786dca1",
      };
    }

    return {
      apiKey: process.env.REACT_APP_API_KEY,
      projectId: process.env.REACT_APP_PROJECT_ID,
    };
  }

  return { apiKey, projectId };
}

declare global {
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
}

function enableAppCheck(app: FirebaseApp) {
  if (app.options.projectId === "pass-9f64b") {
    if (process.env.NODE_ENV !== 'production') {
      window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }

    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider("6Ldb4G0nAAAAAEeiedI4xSCeeAXq_xqz0kiLKCV_"),
      isTokenAutoRefreshEnabled: true
    });
  }
}

const app = initializeApp(getFirebaseConfig());

enableAppCheck(app);
updateTheme();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage app={app} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/manager",
    element: <RequireAuth redirectTo="/">
      <SearchProvider>
        <ManagerPage app={app} />
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
