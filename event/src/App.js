import React, { useState, useEffect } from "react";
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
  const [text, setText] = useState("");
  const [guestBook, setGuestBook] = useState([]);

  useEffect(() => {
    firebaseAuth();
  }, []);

  const firebaseAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuth(true);
        setLogInForm(false);
        subscribe();
      } else {
        setAuth(false);
        setLogInForm(false);
      }
    });
  };

  const subscribe = () => {
    firebase
      .firestore()
      .collection("guestbook")
      .orderBy("timestamp", "desc")
      .onSnapshot((snaps) => {
        // Reset page
        setGuestBook([]);
        // Loop through documents in database
        snaps.forEach((doc) => {
          setGuestBook((old) => [
            ...old,
            doc.data().name + ": " + doc.data().text,
          ]);
        });
      });
  };

  const unsubscribe = () => {
    firebase
      .firestore()
      .collection("guestbook")
      .orderBy("timestamp", "desc")
      .onSnapshot(() => {});
  };

  const showLogIn = () => {
    if (!auth) {
      setLogInForm(true);
    } else {
      unsubscribe();
      firebase.auth().signOut();
      setLogInForm(false);
    }
  };

  const message = (e) => {
    // Prevent the default form redirect
    e.preventDefault();
    // Write a new message to the database collection "guestbook"
    firebase.firestore().collection("guestbook").add({
      text: text,
      timestamp: Date.now(),
      name: firebase.auth().currentUser.displayName,
      userId: firebase.auth().currentUser.uid,
    });
    setText("");
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

      {auth && (
        <section className="guestbook-container">
          <h2>Discussion</h2>

          <form className="leave-message">
            <label>Leave a message: </label>
            <input
              type="text"
              className="message"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button type="submit" onClick={message}>
              <i className="material-icons">send</i>
              <span>SEND</span>
            </button>
          </form>

          <section className="guestbook">
            {guestBook.map((msg) => (
              <p>{msg}</p>
            ))}
          </section>
        </section>
      )}
    </div>
  );
};

export default App;
