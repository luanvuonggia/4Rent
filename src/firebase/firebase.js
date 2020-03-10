import FireBase from 'firebase';
import _ from 'lodash';

const config = {
    apiKey: "AIzaSyDXVflcVTgPa1mXlFO89CQOLs-r-akhvaM",
    authDomain: "rent-1cbb7.firebaseapp.com",
    databaseURL: "https://rent-1cbb7.firebaseio.com",
    projectId: "rent-1cbb7",
    storageBucket: "rent-1cbb7.appspot.com",
    //messagingSenderId: "1072748217375"
};


   
// if (! firebase.apps.length) {
//     firebase.initializeApp(config);
// }
const firebase = FireBase.initializeApp(config); 
const db = firebase.database();
const auth = firebase.auth();
const getData = (part) => db.ref(part).once('value').then((snapshot) => snapshot.val());
const update = (part, data) => db.ref().update({[part]: data});
const getLastIndex = (part) => {
   return getData(part).then((data) => {
     return (data && _.last(Object.keys(data))) || -1
   })
 }
 

export {
    db,
    auth,
    getData,
    update,
    getLastIndex,
    firebase
};
