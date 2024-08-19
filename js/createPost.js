import {
	db,
	collection,
	addDoc,
	auth,
	setDoc,
	doc,
	onAuthStateChanged,
	getDocs,
} from "./firebase.mjs";

let heading = document.getElementById("heading");
let postContent = document.getElementById("post-content");
let category = document.getElementById("categories");
let postForm = document.getElementById("post");

const user = auth.currentUser;
console.log(auth);
const collectionRef = collection(db, "posts");
// console.log(heading, postContent, postForm);
postForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	e.target[3].disabled = true;
	e.target[3].innerText = "Publishing....";
	onAuthStateChanged(auth, async (user) => {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/auth.user
			const uid = user.uid;
			try {
				const querySnapshot = await getDocs(collection(db, "users"));
				querySnapshot.forEach(async (doc) => {
					let data = doc.data();
					if (data.email === user.email) {
						console.log(data);
						const docRef = await addDoc(collectionRef, {
							heading: heading.value,
							authorImage: data.image,
							authorEmail: data.email,
							authorName:
								data.userName[0].toUpperCase() + data.userName.slice(1),
							category: category.value,
							postContent: postContent.value,
							data: `${new Date().getDate()}-${
								new Date().getMonth() + 1
							}-${new Date().getFullYear()}`,
						});
						console.log("Document written with ID: ", docRef.id);
						// await setDoc(doc(db, "posts", docRef.id), {
						// 	id: docRef.id,
						// });
						e.target[3].disabled = false;
						e.target[3].innerText = "Publish";
						window.location.href = "./index.html";
					}
				});

				// await setDoc(doc(db, "posts", docRef.id), {
				// 	id: docRef.id,
				// 	heading: heading.value,
				// 	category: category.value,
				// 	postContent: postContent.value,
				// 	data: `${new Date().getDate()}-${
				// 		new Date().getMonth() + 1
				// 	}-${new Date().getFullYear()}`,
				// });
			} catch (e) {
				console.error("Error adding document: ", e);
				alert("error===>" + e);
			}
			// For user image and user author
		} else {
			// User is signed out
			// ...
		}
	});
});

// onAuthStateChanged(auth, async (user) => {
// 	if (user) {
// 		// User is signed in, see docs for a list of available properties
// 		// https://firebase.google.com/docs/reference/js/auth.user
// 		const uid = user.uid;

// 		// ...
// 	} else {
// 		// User is signed out
// 		// ...
// 	}
// });

// try {
// 	const docRef = await addDoc(collection(db, "posts"));
// 	console.log("Document written with ID: ", docRef.id);
// 	await setDoc(doc(db, "posts", docRef.id), {
// 		id: docRef.id,
// 		heading: heading.value,
// 		category: category.value,
// 		postContent: postContent.value,
// 		data: `${new Date().getDate()}-${
// 			new Date().getMonth() + 1
// 		}-${new Date().getFullYear()}`,
// 	});
// 	// 	e.target[3].disabled = false;
// 	// 	e.target[3].innerText = "Publish";
// 	// 	window.location.href = "../pages/dashboard.html";
// } catch (e) {
// 	console.error("Error adding document: ", e);
// 	alert("error===>" + e);
// }

// const querySnapshot = await getDocs(collection(db, "users"));
// querySnapshot.forEach(async (doc) => {
// 	let data = doc.data();
// 	if (data.email === user.email) {
// 		console.log(data);
// 	}
// });
