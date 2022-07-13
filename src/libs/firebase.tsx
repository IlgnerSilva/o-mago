import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB8AXPU-x3yCdfWSe6Lf1q_v08WZ5kDwVk",
    authDomain: "o-mago-745dc.firebaseapp.com",
    projectId: "o-mago-745dc",
    storageBucket: "o-mago-745dc.appspot.com",
    messagingSenderId: "377859535475",
    appId: "1:377859535475:web:0eac0ad5be1b7d0e13f006",
    measurementId: "G-655KR3LMS5"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();

export {db, auth, storage, functions};
