/* query_devices.js */
console.log("Inside query_devices.js");

// Retrieve desired data
document.getElementById("queryDevices").addEventListener("submit", async(e) => {
	e.preventDefault();
	const username = document.getElementById("username").value;

	console.log(`Sending ${username} to backend...`);

	// Send data to my backed API
	const response = await fetch(`routes/devices/query?username=${encodeURIComponent(username)}`, {
		method: "GET",
		headers: {
			"Accept": "application/json"
		}
	});

	const data = await response.json();
	console.log(`Data returned from query_devices.js: ${data}`);
});


// Send output back to page
function display(devices){
	const output = document.getElementById("output");

	output.innerHTML = `
		<ul>
			${devices.map(d => `
				<li>
					<strong>${d.device_name}</strong>
					<ul>
						<li>Device type: ${d.device_type}</li>
						<li>Registered at: ${d.registered_at}</li>
						<li>Belongs to: [INSERT QUERY TO GET USER]</li>
					</ul>
				</li>
			`).join('')}
		</ul>

	`;
}
