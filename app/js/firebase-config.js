// Initialize Firebase
var config = {
    apiKey: "AIzaSyCeJeTmb10IyRaBUjUU0iXgLDVmMT9Mx2I",
    authDomain: "ultra-17.firebaseapp.com",
    databaseURL: "https://ultra-17.firebaseio.com",
    projectId: "ultra-17",
    storageBucket: "ultra-17.appspot.com",
    messagingSenderId: "42234603674"
};

//Inicializamos la aplicación
firebase.initializeApp(config);

//Referencias
const db = firebase.database();
let PostRef = db.ref('posts');
let UserRef = db.ref('users/');
let HashtagsRef = db.ref('hashtags');
var storage = firebase.storage();