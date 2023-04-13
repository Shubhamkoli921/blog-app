import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBAN2Wwwc9R780TnnBUOo6sT2jiQdz9c7k",
  authDomain: "my-react-blog-223cb.firebaseapp.com",
  projectId: "my-react-blog-223cb",
  storageBucket: "my-react-blog-223cb.appspot.com",
  messagingSenderId: "534817542470",
  appId: "1:534817542470:web:e7c58beb471b29dc05d547",
  measurementId: "G-80K45085CB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
