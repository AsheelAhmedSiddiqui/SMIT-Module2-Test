import { db, collection, addDoc, auth, setDoc, doc } from "./firebase.mjs";

let heading = document.getElementById("heading");
let postContent = document.getElementById("post-content");
let category = document.getElementById("categoryItem");
let postForm = document.getElementById("post");

// console.log(heading, postContent, postForm);

postForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	try {
		const docRef = await addDoc(collection(db, "posts"), {
			// user: auth.currentUser,
			// heading: heading.value,
			// category: category.value,
			// postContent: postContent.value,
			// data: `${new Date().getDate()}-${
			// 	new Date().getMonth() + 1
			// }-${new Date().getFullYear()}`,
		});
		console.log("Document written with ID: ", docRef.id);
		await setDoc(doc(db, "posts", docRef.id), {
			id: docRef.id,
			heading: heading.value,
			category: category.value,
			postContent: postContent.value,
			data: `${new Date().getDate()}-${
				new Date().getMonth() + 1
			}-${new Date().getFullYear()}`,
		});
		window.location.href = "../pages/dashboard.html";
	} catch (e) {
		console.error("Error adding document: ", e);
	}
});
