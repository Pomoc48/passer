import ReactDOM from 'react-dom/client';
import './scss/theme.scss';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/home';
import ManagerPage from './pages/manager';
import { RequireAuth } from './components/manager/require-auth';
import { UserProvider } from './context/user';
import { KeyProvider } from './context/key';
import React from 'react';
import ErrorPage from './pages/error';
import { thirdPartyHosted } from './functions/utils';

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

function getFirebaseApp(): FirebaseApp | null {
  let apiKey = localStorage.getItem('apiKey');
  let projectId = localStorage.getItem('projectId');

  if (apiKey === null || projectId === null) {
    if (thirdPartyHosted()) {
      return null;
    }

    return initializeApp(
      {
        apiKey: "AIzaSyC6v6N8InH2SNyjoGnfgQ_DPmV2Xw30f4k",
        projectId: "pass-9f64b",
        appId: "1:31474752244:web:68a51225edf4bc9786dca1",
      }
    );
  }

  return initializeApp({ apiKey, projectId });
}

declare global {
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
}

function enableAppCheck(app: FirebaseApp | null) {
  if (app === null) {
    return;
  }

  if (thirdPartyHosted()) {
    return;
  }

  if (process.env.NODE_ENV !== 'production') {
    window.self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }

  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider("6Ldb4G0nAAAAAEeiedI4xSCeeAXq_xqz0kiLKCV_"),
    isTokenAutoRefreshEnabled: true
  });
}

const app = getFirebaseApp();

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
      <ManagerPage app={app!} />
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
