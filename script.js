const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:',.<>?/`~";

let output = document.getElementById("output");
let timerText = document.getElementById("timer");

function startGuessing() {
	const target = document.getElementById("password").value;

	if (target.length !== 5) {
		alert("Please enter exactly 5 characters.");
		return;
	}

	let startTime = Date.now();
	let attempts = 0;
	let guess = "";
	let interval;

	// Generate all possible 5-character combinations
	let allCombos = [];

	function generateCombos(prefix = "") {
		if (prefix.length === 5) {
			allCombos.push(prefix);
			return;
		}
		for (let i = 0; i < charset.length; i++) {
			generateCombos(prefix + charset[i]);
		}
	}

	output.innerText = "Generating guesses (this might take a few seconds)...";
	setTimeout(() => {
		allCombos = [];
		generateCombos();

		output.innerText = "Starting to guess...";
		let index = 0;

		interval = setInterval(() => {
			if (index >= allCombos.length) {
				clearInterval(interval);
				output.innerText = "Failed to guess.";
				return;
			}

			guess = allCombos[index];
			attempts++;
			output.innerText = `Trying: ${guess}`;

			if (guess === target) {
				clearInterval(interval);
				const seconds = ((Date.now() - startTime) / 1000).toFixed(2);
				timerText.innerText = `Found in ${seconds} seconds with ${attempts} attempts!`;
			}

			index++;
		}, 5); // Speed: 5ms per guess
	}, 200); // Small delay so page doesn't freeze
}
