const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/`~";

function startGuessing() {
	const passwordInput = document.getElementById("password");
	const output = document.getElementById("output");
	const timerText = document.getElementById("timer");
	const gear = document.getElementById("gear");

	if (!passwordInput || !output || !timerText) {
		alert("Required elements not found in the HTML.");
		return;
	}

	const target = passwordInput.value;

	if (target.length !== 5) {
		alert("Please enter exactly 5 characters.");
		return;
	}

	output.innerText = "Starting...";
	timerText.innerText = "⏱ Calculating...";
	gear.style.display = "inline-block";

	let startTime = performance.now();
	let attempts = 0;

	const charsetLength = charset.length;
	let indices = [0, 0, 0, 0, 0];
	let running = true;

	function getGuess(indices) {
		return charset[indices[0]] + charset[indices[1]] + charset[indices[2]] + charset[indices[3]] + charset[indices[4]];
	}

	async function guessLoop() {
		while (running) {
			// Guess in batches to avoid lag
			for (let batch = 0; batch < 5000; batch++) {
				let guess = getGuess(indices);
				attempts++;

				if (guess === target) {
					const time = ((performance.now() - startTime) / 1000).toFixed(2);
					output.innerText = `✅ Found: ${guess}`;
					timerText.innerText = `🧠 Time: ${time}s | Attempts: ${attempts}`;
					gear.style.display = "none";
					running = false;
					return;
				}

				// Update indices like base conversion
				for (let i = 4; i >= 0; i--) {
					if (indices[i] < charsetLength - 1) {
						indices[i]++;
						break;
					} else {
						indices[i] = 0;
					}
				}
			}
			await new Promise(resolve => setTimeout(resolve, 1)); // Yield control
		}
	}

	guessLoop();
}
