// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-storage.js";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
	getFirestore,
	collection,
	addDoc,
	getDocs,
	doc,
	deleteDoc,
	updateDoc,
	deleteField,
	setDoc,
	onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAIj1db_TY8ATf8NEPKSbw8fk_Zo2UoGlk",
	authDomain: "smit-test-6951c.firebaseapp.com",
	projectId: "smit-test-6951c",
	storageBucket: "smit-test-6951c.appspot.com",
	messagingSenderId: "376213998779",
	appId: "1:376213998779:web:80e61207a8a465bce4ad9e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();
// Export all function
export {
	app,
	auth,
	db,
	collection,
	addDoc,
	deleteDoc,
	updateDoc,
	deleteField,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	storage,
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
	doc,
	setDoc,
	getDocs,
	onSnapshot,
};
