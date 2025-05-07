/* query_users.js */
console.log("Inside query_users.js");

// Retrieve desired data
document.getElementById("queryUsers").addEventListener("submit", async(e) => {
	e.preventDefault();
	const username = document.getElementById("username").value;

	console.log(`Sending ${username} to backend...`);

	// Send data to my backed API
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
	const data = await response.json();
	console.log(`Data returned from query_users.js: ${data}`);

});

function display(users){
	const output = document.getElementById("output");

	output.innerHTML = `
		<ul>
			${users.map(u => `
				<li>
					<strong>${u.username}</strong>
					<ul>
						<li>User ID: ${u.user_id}</li>
						<li>Created at: ${u.created_at}</li>
					</ul>
				</li>
			`).join('')}
		</ul>

	`;
}

