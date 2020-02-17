import * as firebase from 'firebase';
import _ from 'lodash';

const prodConfig = {
    apiKey: "AIzaSyDXVflcVTgPa1mXlFO89CQOLs-r-akhvaM",
    authDomain: "rent-1cbb7.firebaseapp.com",
    databaseURL: "https://rent-1cbb7.firebaseio.com",
    projectId: "rent-1cbb7",
    //storageBucket: "hoanapp.appspot.com",
    //messagingSenderId: "1072748217375"
};

const devConfig = {
    apiKey: "AIzaSyDXVflcVTgPa1mXlFO89CQOLs-r-akhvaM",
    authDomain: "rent-1cbb7.firebaseapp.com",
    databaseURL: "https://rent-1cbb7.firebaseio.com",
    projectId: "rent-1cbb7",
    //storageBucket: "hoanapp.appspot.com",
    //messagingSenderId: "1072748217375"
};

const config = process.env.NODE_ENV === 'production'
    ? prodConfig
    : devConfig;

if (! firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();
const getData = (part) => db.ref(part).once('value').then((snapshot) => snapshot.val());
const update = (part, data) => db.ref().update({[part]: data});
const getLastIndex = (part) => {
   return getData(part).then((data) => {
     return _.last(Object.keys(data))
   })
 }

export {
    db,
    auth,
    getData,
    update,
    getLastIndex
};
