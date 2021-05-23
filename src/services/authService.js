import firebase from './firebaseService';
import 'firebase/auth';

export const login = ( email, password ) => {
    return new Promise( (resolve, reject ) => {

        firebase.auth().signInWithEmailAndPassword( email, password )
        .then( user => {
            resolve( user );
        })
        .catch( err => {
            reject( err );
        });

    });
}