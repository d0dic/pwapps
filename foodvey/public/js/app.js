
// register service worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(reg => {
            // console.log('worker registered', reg)
            return reg
        })
        .catch(err => console.log('worker not registered', err))
}

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCC2kIrfW-jV36RoLOBJSYQVZysefUs2_w",
    authDomain: "foodorderstorage.firebaseapp.com",
    databaseURL: "https://foodorderstorage.firebaseio.com",
    projectId: "foodorderstorage",
    storageBucket: "foodorderstorage.appspot.com",
    messagingSenderId: "2056688367",
    appId: "1:2056688367:web:e31e5e1e01460635"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// set variables
var orders = []
var menu = {}

const setUser = user => localStorage.setItem('user', JSON.stringify(user))

const getUser = () => JSON.parse(localStorage.getItem('user'))