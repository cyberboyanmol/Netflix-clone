import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "your api key",
  authDomain: "project auth domain",
  projectId: "project id",
  storageBucket: "your project detail",
  messagingSenderId: "your project detail",
  appId: "web:your project detail",
});

const db = firebaseApp.firestore();
const Fire = firebaseApp;
export { db, Fire };
