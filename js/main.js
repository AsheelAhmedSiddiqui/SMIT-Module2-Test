import {
	auth,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from "./firebase.mjs";

let email = document.getElementById("email");
let password = document.getElementById("password");
let loginForm = document.getElementById("login");
let showPass = document.getElementById("show");

showPass.addEventListener("click", () => {
	if (showPass.checked) {
		password.type = "text";
	} else {
		password.type = "password";
	}
});

loginForm.addEventListener("submit", (e) => {
	e.preventDefault();
	signInWithEmailAndPassword(auth, email.value, password.value)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			// ...
			alert("Successfully login");
			window.location.href = "index.html";
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			alert("Error ==> " + errorCode);
		});
});

// onAuthStateChanged(auth, (user) => {
// 	if (user) {
// 		// User is signed in, see docs for a list of available properties
// 		// https://firebase.google.com/docs/reference/js/auth.user
// 		const uid = user.uid;
// 		// ...
// 	} else {
// 		// User is signed out
// 		// window.location.href = "../index.html";
// 		// ...
// 	}
// });

// console.log(email, password, loginForm);
