import { initializeApp } from "firebase/app";

// configuraciones que nos provee firebase para conectarnos a la base de datos
const firebaseConfig = {
  apiKey: "AIzaSyBCsXMpzjFHmGyYl3jL8PsT4JbTZImBirI",
  authDomain: "challenge-greydive-ff240.firebaseapp.com",
  projectId: "challenge-greydive-ff240",
  storageBucket: "challenge-greydive-ff240.appspot.com",
  messagingSenderId: "568705057255",
  appId: "1:568705057255:web:84bd365062a29901e4bd42",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
