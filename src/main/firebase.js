import firebase from 'firebase';
import config from './secrets/credentials';

firebase.initializeApp(config);
export default firebase;