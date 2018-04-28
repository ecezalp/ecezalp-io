import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDgXaTbfVTVl-R3IqubQ9n7WG4EueymxpA",
  authDomain: "ecezalp-io.firebaseapp.com",
  databaseURL: "https://ecezalp-io.firebaseio.com",
  projectId: "ecezalp-io",
  storageBucket: "ecezalp-io.appspot.com",
  messagingSenderId: "480863727468",
};

firebase.initializeApp(config);
export default firebase;