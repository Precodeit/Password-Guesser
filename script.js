const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/`~";

function startGuessing() {
	const target = document.getElementById("password").value;

	if (target.length !== 5) {
		alert("Please enter exactly 5 characters.");
		return;
	}

	const startTime = Date.now();
	const output = document.getElementById("output");
	const timerText = document.getElementById("timer");

	let attempts = 0;
	let found = false;

	// Use nested loops instead of recursion
	for (let a = 0; a < charset.length; a++) {
		for (let b = 0; b < charset.length; b++) {
			for (let c = 0; c < charset.length; c++) {
				for (let d = 0; d < charset.length; d++) {
					for (let e = 0; e < charset.length; e++) {
						const guess = charset[a] + charset[b] + charset[c] + charset[d] + charset[e];
						attempts++;

						if (guess === target) {
							found = true;
							const time = ((Date.now() - startTime) / 1000).toFixed(2);
							output.innerText = `Password found: ${guess}`;
							timerText.innerText = `Time: ${time} sec | Attempts: ${attempts}`;
							return;
						}
					}
				}
			}
		}
	}

	if (!found) {
		output.innerText = "Password not found.";
	}
}
