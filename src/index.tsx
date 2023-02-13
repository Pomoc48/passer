import ReactDOM from 'react-dom/client';
import './css/index.css';
import { initializeApp } from 'firebase/app';
import App from './routes/App';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

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

root.render(
  <App app={app} />
);
