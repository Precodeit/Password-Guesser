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

	const startTime = performance.now();
	let attempts = 0;
	let guess = "";

	const charsetLength = charset.length;

	// Brute-force using nested loops
	outerLoop:
	for (let i1 = 0; i1 < charsetLength; i1++) {
		for (let i2 = 0; i2 < charsetLength; i2++) {
			for (let i3 = 0; i3 < charsetLength; i3++) {
				for (let i4 = 0; i4 < charsetLength; i4++) {
					for (let i5 = 0; i5 < charsetLength; i5++) {
						guess = charset[i1] + charset[i2] + charset[i3] + charset[i4] + charset[i5];
						attempts++;

						if (guess === target) {
							break outerLoop;
						}
					}
				}
			}
		}
	}

	const endTime = performance.now();
	const totalTime = ((endTime - startTime) / 1000).toFixed(2);

	output.innerText = `✅ Password found: ${guess}`;
	timerText.innerText = `Time: ${totalTime} seconds | Attempts: ${attempts}`;
}
