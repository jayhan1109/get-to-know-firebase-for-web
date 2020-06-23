// Your web app's Firebase configuration
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyAB3wiGiJ2ZRXtWswfTeLxM4XrWNa9NlB4",
  authDomain: "fir-web-codelab-4cb04.firebaseapp.com",
  databaseURL: "https://fir-web-codelab-4cb04.firebaseio.com",
  projectId: "fir-web-codelab-4cb04",
  storageBucket: "fir-web-codelab-4cb04.appspot.com",
  messagingSenderId: "1039916848462",
  appId: "1:1039916848462:web:0d7b08fc9b73fea5ecba1f",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Configure FirebaseUI.
export const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

export default firebase;
