import { initializeApp } from "firebase/app";
import Login from './pages/Login';

function App() {

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

  return (
    <Login app={app} />
  );
}

export default App;
