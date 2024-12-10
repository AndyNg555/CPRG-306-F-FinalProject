// src/_utils/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBTk1ZFHD4PPLazKcKnPVyEyuxCusHt3fQ",
  authDomain: "cprg-306-f-finalproject.firebaseapp.com",
  projectId: "cprg-306-f-finalproject",
  storageBucket: "cprg-306-f-finalproject.firebasestorage.app",
  messagingSenderId: "466345900764",
  appId: "1:466345900764:web:e719f11b62c0ed17e79219"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const githubProvider  = new GithubAuthProvider();

export { auth, githubProvider };
