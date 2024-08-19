import {
	auth,
	db,
	createUserWithEmailAndPassword,
	collection,
	addDoc,
	ref,
	getStorage,
	uploadBytes,
	getDownloadURL,
	setDoc,
	storage,
	doc,
} from "./firebase.mjs";

let createEmail = document.getElementById("user-email");
let createPassword = document.getElementById("user-password");
let userName = document.getElementById("username");
let oriName = document.getElementById("name");
let image = document.getElementById("img");
let accountFrom = document.getElementById("account");

accountFrom.addEventListener("submit", async (e) => {
	e.preventDefault();
	let submitBtn = document.getElementById("submit");
	let imageFile = image.files[0];

	submitBtn.disabled = true;
	submitBtn.innerText = "loading...";
	createUserWithEmailAndPassword(auth, createEmail.value, createPassword.value)
		.then(async (userCredential) => {
			// Signed up
			const user = userCredential.user;
			const imagesRef = ref(storage, "images/" + user.uid);
			uploadBytes(imagesRef, imageFile).then((user) => {
				console.log("Uploaded a blob or file!");
				getDownloadURL(imagesRef)
					.then(async (url) => {
						console.log("url aagaya==> " + url);

						try {
							const docRef = await addDoc(collection(db, "users"), {
								email: createEmail.value,
								name: oriName.value,
								username: userName.value,
								image: url,
								password: createPassword.value,
							});
							console.log("Document written with ID: ", docRef.id);
							window.location.href = "./pages/dashboard.html";
						} catch (e) {
							console.error("Error adding document: ", e);
						}
					})
					.catch((err) => {
						console.log(err);
					});
			});
			// store firestore data

			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
			alert("error===> " + errorCode + "errormess ==> " + errorMessage);
		});
});

// console.log(
// 	createEmail,
// 	createPassword,
// 	confirm,
// 	userName,
// 	oriName,
// 	accountFrom
// );
