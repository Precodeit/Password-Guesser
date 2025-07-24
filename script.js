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
	let guess = ["", "", "", "", ""]; // Starting guess
	let found = false;
	let attempts = 0;

	function tryNext(index = 0) {
		if (index >= 5) {
			attempts++;
			const currentGuess = guess.join("");
			output.innerText = `Trying: ${currentGuess}`;
			if (currentGuess === target) {
				const seconds = ((Date.now() - startTime) / 1000).toFixed(2);
				timerText.innerText = `Found in ${seconds} seconds with ${attempts} attempts!`;
				return;
			}
			return tryNext(4);
		}

		for (let i = 0; i < charset.length; i++) {
			guess[index] = charset[i];
			tryNext(index + 1);
			if (guess.join("") === target) return;
		}
	}

	setTimeout(() => {
		tryNext();
	}, 100);
}
