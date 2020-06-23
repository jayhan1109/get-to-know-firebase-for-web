import React, { Fragment, useState, useEffect } from "react";
// Import stylesheets
import "./App.css";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase, { uiConfig } from "./service/firebase";
// Firebase config

// Auth with FirebaseUI
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const App = () => {
  const [auth, setAuth] = useState(false);
  const [logInForm, setLogInForm] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuth(true);
        setLogInForm(false);
      } else {
        setAuth(false);
        setLogInForm(false);
      }
    });
  }, []);

  const showLogIn = () => {
    if (!auth) {
      setLogInForm(true);
    } else {
      firebase.auth().signOut();
      setLogInForm(false);
    }
  };

  return (
    <div className="app">
      <img src="https://firebasestorage.googleapis.com/v0/b/fir-images-a61c9.appspot.com/o/codelab.png?alt=media&token=f45f808c-ce40-4b34-944c-8d8fac00e13d" />

      <section className="event-details-container">
        <h1>Firebase Meetup</h1>
        <p>
          <i className="material-icons">calendar_today</i> October 30
        </p>
        <p>
          <i className="material-icons">location_city</i> San Francisco
        </p>

        <button className="startRsvp" onClick={showLogIn}>
          {auth ? "LOGOUT" : "RSVP"}
        </button>
      </section>

      <hr />

      {!auth && logInForm && (
        <section className="firebaseui-auth-container">
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </section>
      )}

      <section className="description-container">
        <h2>What we'll be doing</h2>
        <p>Join us for a day full of Firebase Workshops and Pizza!</p>
      </section>

      <section className="guestbook-container"></section>
    </div>
  );
};

export default App;
