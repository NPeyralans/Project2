/* query_devices.js */
console.log("Inside query_devices.js");

// Retrieve desired data
document.getElementById("queryDevices").addEventListener("submit", async(e) => {
	e.preventDefault();
	const username = document.getElementById("username").value;
	const output = document.getElementById("output");
	output.innerHTML = "";

	console.log(`Sending ${username} to backend...`);

	// Send data to my backed API
	try {
		const response = await fetch(`/devices/query?username=${encodeURIComponent(username)}`, {
			method: "GET",
			headers: {
				"Accept": "application/json"
			}
		});

		const devices = await response.json();

		if (!response.ok){
			throw new Error(devices.error || "Invalid username");
		}

		console.log("Returned from API: ", devices);

		if (devices.length === 0) {
			output.innerHTML = `<p>No devices found for that user</p>`;
			return;
		}

		devices.forEach(device => {
				const div = document.createElement("div");
				div.className = "device";
				div.innerHTML = `
					<p><strong>Device ID:</strong> ${device.device_id}</p>
					<p><strong>Device Name:</strong> ${device.device_name}</p>
					<p><strong>Registered at:</strong> ${new Date(device.registered_at).toLocaleString()}</p>
				`;

				output.appendChild(div);
			});
	} catch(err){
		console.log(err);
		output.innerHTML = `<p class="error">Error: ${err.message}</p>`;
	}
});

