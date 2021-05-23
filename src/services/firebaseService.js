import firebase from 'firebase/app'


var firebaseConfig = {
    apiKey: "AIzaSyAi9k5VTGteGaDHr0hMFZP0y2oEForA5ZM",
    authDomain: "products-manager-malaquita.firebaseapp.com",
    projectId: "products-manager-malaquita",
    storageBucket: "products-manager-malaquita.appspot.com",
    messagingSenderId: "360060037133",
    appId: "1:360060037133:web:d4e0983b0497cd2a340d44"
};


export default firebase.initializeApp(firebaseConfig);