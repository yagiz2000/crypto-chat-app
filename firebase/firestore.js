import firebase from "firebase";
firebase.initializeApp({
    apiKey: "AIzaSyCV7Mm2zGAktdiDc_4_lWqq8BH6pstkvfU",
    authDomain: "crypto-chat-20e7b.firebaseapp.com",
    projectId: "crypto-chat-20e7b",
  });
const db = firebase.firestore();
export{db}