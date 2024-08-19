import { auth, signOut, onAuthStateChanged } from "./firebase.mjs";

let logOut = document.getElementById("signOut");

logOut.addEventListener("click", () => {
	signOut(auth)
		.then(() => {
			// Sign-out successful.
			alert("You are logout");
			window.location.href = "../index.html";
		})
		.catch((error) => {
			// An error happened.
			alert(error);
		});
});
