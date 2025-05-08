/* add_devices.js */
console.log("Inside add_devices.js");

// Retrieve desired data
document.getElementById("addDevice").addEventListener("submit", async(e) => {
	e.preventDefault();
	const username = document.getElementById("username").value;
	const devicename = document.getElementById("deviceName").value;

	console.log(`Username: ${username} and deviceName: ${deviceName} passed to backend`);

	const output = document.getElementById("output");
	output.innerHTML = "";

	// Send data to my backed API
	try {
		const response = await fetch('/devices', {
			method: "POST",
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ username, device_name: devicename })
		});

		const device = await response.json();

		if (!response.ok){
			throw new Error(device.error || "Invalid username");
		}
		console.log("Returned from API: ", device);

		if (device.length === 0) {
			res.status(404).json({ message: "No devices found" });
		}

		const div = document.createElement("div");
		div.className = "device";
		div.innerHTML = `
			<p><strong>New device successfully created!</strong></p>
			<p><strong>Device ID:</strong> ${device.device_id}</p>
			<p><strong>Device Name:</strong> ${device.device_name}</p>
			<p><strong>Registered to:</strong> ${device.username}</p>
		`;

		output.appendChild(div);
	} catch(err){
		output.innerHTML = `<p class="error">Error: ${err.message}</p>`;
	}
});

