import {
	auth,
	db,
	collection,
	addDoc,
	signOut,
	onAuthStateChanged,
	getDocs,
	onSnapshot,
	deleteDoc,
} from "./firebase.mjs";

let createPost = document.getElementById("createPost");
let postConatiner = document.getElementById("posts");
let footerYear = document.getElementById("year");
let userImage = document.getElementById("userImage");
let today = new Date();
footerYear.innerText = today.getFullYear();

let logOut = document.getElementById("signOut");
console.log(logOut);

createPost.addEventListener("click", () => {
	window.location.href = "../pages/createPost.html";
});

logOut.addEventListener("click", () => {
	signOut(auth)
		.then(() => {
			// Sign-out successful.
			alert("Successfully sign out");
		})
		.catch((error) => {
			// An error happened.
			alert(error);
		});
});

onAuthStateChanged(auth, async (user) => {
	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/auth.user
		const uid = user.uid;
		const querySnapshot = await getDocs(collection(db, "users"));
		querySnapshot.forEach((doc) => {
			let data = doc.data();
			if (data.email === user.email) {
				userImage.src = data.image;
				console.log(data.image);
			}
		});
		const postData = await getDocs(collection(db, "posts"));
		postData.forEach((doc) => {
			let postData = doc.data();
			postConatiner.innerHTML += `
			<div class="postBox">
						<h4>Asheel Ahmed Siddiqui</h4>
						<p id="datemonth">${postData.data}</p>
						<h1>${postData.heading}</h1>
						<p>
							${postData.postContent}
						</p>
						<button id="deletPost">Delete</button>
					</div>
			`;
		});
		// ...
	} else {
		// User is signed out
		window.location.href = "../index.html";
		// ...
	}
});

// let deleteBtn = document.getElementById("deletePost");
// deleteBtn.addEventListener("click", () => {
// 	const postData = await getDocs(collection(db, "posts"));
// 	postData.forEach((doc) => {
// 		if (doc.data) {
			
// 		}
// 		await deleteDoc(doc(db, "cities", ));

// 	}
// }
