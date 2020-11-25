import firebase from "firebase";
//auth
import "firebase/auth"; //auth
import "firebase/database";//database can like sql,mangodb
import "firebase/storage";//storage ///images,photos,pdf,fonts

const firebaseConfig = {
    apiKey: "AIzaSyC1BLi6pb8Xv5bR4cND4OzNvlXkn712bjI",
    authDomain: "hotstar-2ea7b.firebaseapp.com",
    databaseURL: "https://hotstar-2ea7b.firebaseio.com",
    projectId: "hotstar-2ea7b",
    storageBucket: "hotstar-2ea7b.appspot.com",
    messagingSenderId: "278021696556",
    appId: "1:278021696556:web:bb1abbcb78405f7b657589"
  };
//initialize firebase and react applicaion
firebase.initializeApp(firebaseConfig);

export default firebase;