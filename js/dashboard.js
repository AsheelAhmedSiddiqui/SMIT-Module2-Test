import {
	auth,
	db,
	collection,
	onAuthStateChanged,
	getDocs,
} from "./firebase.mjs";

let postConatiner = document.getElementById("posts");
let footerYear = document.getElementById("year");
let userImage = document.getElementById("userImage");
let userCon = document.getElementById("user");
console.log(userCon);
let today = new Date();
footerYear.innerText = today.getFullYear();

// let logOut = document.getElementById("signOut");
// console.log(logOut);

// createPost.addEventListener("click", () => {
// 	window.location.href = "../pages/createPost.html";
// });

// logOut.addEventListener("click", () => {
// 	signOut(auth)
// 		.then(() => {
// 			// Sign-out successful.
// 			alert("Successfully sign out");
// 		})
// 		.catch((error) => {
// 			// An error happened.
// 			alert(error);
// 		});
// });

onAuthStateChanged(auth, async (user) => {
	if (user) {
		// User is signed in, see docs for a list of available properties
		// https://firebase.google.com/docs/reference/js/auth.user
		const uid = user.uid;
		userCon.innerHTML += `
			<a href="./pages/createPost.html">Create Post</a>
			<a href="./pages/mypost.html">My Post</a>
					
		`;

		const querySnapshot = await getDocs(collection(db, "users"));
		querySnapshot.forEach((doc) => {
			let data = doc.data();
			if (data.email === user.email) {
				// userImage.src = data.image;
				userCon.innerHTML += `
					<div class="userIcon">
						<img src="${data.image}" id="userImage" />
					</div>
				`;
				// console.log(data.image);
			}
		});

		const postData = await getDocs(collection(db, "posts"));
		postData.forEach((doc) => {
			let postData = doc.data();
			postConatiner.innerHTML += `
			<div class="postBox">
						<div class="userDetails">
							<img src="${postData.authorImage}" >
							<div class="userDate">
								<h4>${postData.authorName}</h4>
								<p id="datemonth">${postData.data}</p>
							</div>
						</div>
						<h1>${postData.heading}</h1>
						<p>${postData.postContent}</p>
					</div>
			`;
		});

		console.log(user);

		// ...
	} else {
		// User is signed out
		// ...
		userCon.innerHTML += `
			<a href="./pages/login.html">login</a>
					<div class="userIcon">
						<img id="userImage" />
					</div>
		`;

		const postData = await getDocs(collection(db, "posts"));
		postData.forEach((doc) => {
			let postData = doc.data();
			postConatiner.innerHTML += `
					<div class="postBox">
						<div class="userDetails">
							<img src="${postData.authorImage}" >
							<div class="userDate">
								<h4>${postData.authorName}</h4>
								<p id="datemonth">${postData.data}</p>
							</div>
						</div>
						<h1>${postData.heading}</h1>
						<p>${postData.postContent}</p>
					</div>
			`;
		});
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

// const querySnapshot = await getDocs(collection(db, "users"));
// 		querySnapshot.forEach((doc) => {
// 			let data = doc.data();
// 			if (data.email === user.email) {
// 				userImage.src = data.image;
// 				console.log(data.image);
// 			}
// 		});

// createPost.addEventListener("click", () => {
// 	window.location.href = "../pages/createPost.html";
// });

// logOut.addEventListener("click", () => {
// 	signOut(auth)
// 		.then(() => {
// 			// Sign-out successful.
// 			alert("Successfully sign out");
// 		})
// 		.catch((error) => {
// 			// An error happened.
// 			alert(error);
// 		});
// });
