import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAdK6zIdx5Hbxzn-BLEb2TR3d5P_qyzFJk",
  authDomain: "netflix-clone-7fe77.firebaseapp.com",
  projectId: "netflix-clone-7fe77",
  storageBucket: "netflix-clone-7fe77.appspot.com",
  messagingSenderId: "524162133702",
  appId: "1:524162133702:web:ed73e8b3857ac96a7f31c7",
});

const db = firebaseApp.firestore();
const Fire = firebaseApp;
export { db, Fire };
