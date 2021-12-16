import firebase from 'firebase/app';
import "firebase/database"
const firebaseConfig = {
    apiKey: "AIzaSyAwPnIjrDMdOJHeSpmoPySVPO-DNg8Qz5c",
    authDomain: "react-contact-2637e.firebaseapp.com",
    projectId: "react-contact-2637e",
    storageBucket: "react-contact-2637e.appspot.com",
    messagingSenderId: "553490575103",
    appId: "1:553490575103:web:8a6cb933e5b16e2021e6ca"
  };


  const fireDb = firebase.initializeApp(firebaseConfig);
  export default fireDb.database().ref();