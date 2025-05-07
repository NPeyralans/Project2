/* add_users.js */
console.log("Inside add_users.js");

// Retrieve desired data
document.getElementById("addUser").addEventListener("submit", async(e) => {
	e.preventDefault();

	const formData = new FormData(e.target);

	const data = Object.fromEntries(formData.entries());

	// Send data to my backed API
	const response = await fetch("/users", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	});

	console.log(response.insertId);

	if (!response.ok){
		const text = await response.text();
		throw new Error(`Server returned ${response.status}: ${text}`);
	}

	const result = await response.text();

});

function display(newUser){
	const output = document.getElementById("output");

	output.innerHTML = `
		<ul>
			${newUser.map(u => `
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
