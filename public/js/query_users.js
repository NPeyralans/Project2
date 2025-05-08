/* query_users.js */
console.log("Inside query_users.js");

// Retrieve desired data
document.getElementById("queryUsers").addEventListener("submit", async(e) => {
	e.preventDefault();
	const username = document.getElementById("username").value;
	const output = document.getElementById("output");
	output.innerHTML = "";

	try {
		const response = await fetch(`/users/query?username=${encodeURIComponent(username)}`, {
			method: "GET",
			headers: {
				"Accept": "application/json"
			}
		});

		if (!response.ok) {
			const message = await response.text();
			throw new Error(message);
		}

		console.log("Status Code:", response.status);
		const data = await response.json();
		console.log("Returned from API: ", data);

		if (!data.length){
			output.innerHTML = `<p>No users found.</p>`;
			return;
		}
		const user = data[0];

		const div = document.createElement("div");
		div.className = "user";
		div.innerHTML = `
			<p><strong>User found:</strong>${user.username}</p>
			<p><strong>User ID:</strong>${user.user_id}</p>
			<p><strong>Email:</strong>${user.email}</p>
			<p><strong>Created at:</strong>${new Date(user.created_at).toLocaleString()}</p>
		`;

		output.appendChild(div);
		} catch (err){
			output.innerHTML = `<p class="error">Error: ${err.message}</p>`;
		}
});


