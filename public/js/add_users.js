/* add_users.js */
console.log("Inside add_users.js");

// Retrieve desired data
document.getElementById("addUser").addEventListener("submit", async(e) => {
	e.preventDefault();
	const username = document.getElementById("username").value;
	const email = document.getElementById("email").value;

	console.log(`Username: ${username} and email: ${email} sent to server`);

	const output = document.getElementById("output");
	output.innerHTML = "";

	try {
		const response = await fetch("/users", {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ username, email: email })
		});

		const returnData = await response.json();
		console.log("Returned from API:", returnData);

		const div = document.createElement("div");
		div.className = "newUser";
		div.innerHTML = `
			<p><strong>New user successfully added!</strong></p>
			<p><strong>Username:</strong>${username}</p>
			<p><strong>User ID:</strong>${returnData.user_id}</p>
		`;
		output.appendChild(div);
		
	} catch (err) {
		output.innerHTML = `<p class="error">Error: ${err.message}</p>`
	}
});
