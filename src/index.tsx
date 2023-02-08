import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './routes/Home';
import { initializeApp } from 'firebase/app';
import Login from './routes/Login';
import Error from './routes/Error';

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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login app={app} />,
  },
  {
    path: "/home",
    element: <Home app={app} />,
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
