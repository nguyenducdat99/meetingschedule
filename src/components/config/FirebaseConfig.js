import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
require('firebase/database');

const firebaseConfig = {
    apiKey: "AIzaSyDbYykxZm7w_ar-ZequDcqk-Q0TCV46cx8",
    authDomain: "meetingschedule10.firebaseapp.com",
    databaseURL: "https://meetingschedule10-default-rtdb.firebaseio.com",
    projectId: "meetingschedule10",
    storageBucket: "meetingschedule10.appspot.com",
    messagingSenderId: "476063268587",
    appId: "1:476063268587:web:0dc5b4b1bcbab3ec9988ae",
    measurementId: "G-2F7CSEJHHB"
};

export const config = firebase.initializeApp(firebaseConfig);