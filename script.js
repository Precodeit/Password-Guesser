const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/`~";

function startGuessing() {
	const passwordInput = document.getElementById("password");
	const output = document.getElementById("output");
	const timerText = document.getElementById("timer");

	if (!passwordInput || !output || !timerText) {
		alert("Required elements not found in the HTML.");
		return;
	}

	const target = passwordInput.value;

	if (target.length !== 5) {
		alert("Please enter exactly 5 characters.");
		return;
	}

	output.innerText = "Starting guess...";
	timerText.innerText = "Time: 0.00s";

	let startTime = performance.now();
	let attempts = 0;
	let guess = "";

	const total = charset.length ** 5;
	let indices = [0, 0, 0, 0, 0];

	function step() {
		if (attempts >= total) {
			output.innerText = "Password not found.";
			return;
		}

		// Build guess from current indices
		guess = charset[indices[0]] + charset[indices[1]] + charset[indices[2]] + charset[indices[3]] + charset[indices[4]];
		attempts++;

		if (guess === target) {
			let time = ((performance.now() - startTime) / 1000).toFixed(2);
			output.innerText = `✅ Found: ${guess}`;
			timerText.innerText = `⏱ Time: ${time} sec | Attempts: ${attempts}`;
			return;
		}

		// Update indices manually like a counter
		indices[4]++;
		for (let i = 4; i >= 0; i--) {
			if (indices[i] >= charset.length) {
				if (i === 0) return;
				indices[i] = 0;
				indices[i - 1]++;
			}
		}

		// Schedule next chunk after tiny delay
		if (attempts % 1000 === 0) {
			setTimeout(step, 1); // 1ms pause every 1000 guesses
		} else {
			step();
		}
	}

	setTimeout(step, 50); // Start the first step
}
