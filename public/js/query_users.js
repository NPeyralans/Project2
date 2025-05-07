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

		if (!response.ok){
			const text = await response.text();
			throw new Error(`Server returned ${response.status}: ${text}`);
		}

		const [user] = await response.json();
		console.log("Returned from API: ", user);

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


