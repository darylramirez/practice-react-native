// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCPYViO_eSgamWDp3sEtASLOPHQMw0vMWY',
	authDomain: 'catnap-459c9.firebaseapp.com',
	projectId: 'catnap-459c9',
	storageBucket: 'catnap-459c9.appspot.com',
	messagingSenderId: '921815350118',
	appId: '1:921815350118:web:cce9d11366ff13c62866a7',
	measurementId: 'G-MFYBFFXB07',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
