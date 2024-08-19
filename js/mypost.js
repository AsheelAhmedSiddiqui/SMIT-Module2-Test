import {
	auth,
	signOut,
	onAuthStateChanged,
	getDocs,
	collection,
	db,
} from "./firebase.mjs";

let logOut = document.getElementById("signOut");
let myPosts = document.getElementById("posts");
let footerYear = document.getElementById("year");
let currUserImage = document.getElementById("userImage");
let today = new Date();
footerYear.innerText = today.getFullYear();

logOut.addEventListener("click", () => {
	signOut(auth)
		.then(() => {
			// Sign-out successful.
			alert("You are logout");
			window.location.href = "./index.html";
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
		const queryPostSnap = await getDocs(collection(db, "posts"));
		queryPostSnap.forEach((doc) => {
			let post = doc.data();
			// console.log(post);

			if (post.authorEmail === user.email) {
				console.log(post, user);
				currUserImage.src = post.authorImage;
				myPosts.innerHTML += `
					<div class="postBox">
						<div class="userDetails">
							<img src="${post.authorImage}" >
							<div class="userDate">
								<h4>${post.authorName}</h4>
								<p id="datemonth">${post.data}</p>
							</div>
						</div>
						<h1>${post.heading}</h1>
						<p>${post.postContent}</p>
						<button>Delete</button>
					</div>
			`;
			}
		});
		// ...
	} else {
		// User is signed out
		// window.location.href = "../index.html";
		// ...
	}
});
