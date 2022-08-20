const input = document.querySelector('input');
const defaultEl = document.querySelector('#default span');
const debounceEl = document.querySelector('#debounce span');
const throttleEl = document.querySelector('#throttle span');

// input.addEventListener('input', ({ target }) => {
// 	const { value } = target;

// 	updateDefaultText(value);
// 	updateDebounceText(value);
// 	updateThrottleText(value);
// 	console.log(target.value);
// });

window.addEventListener('mousemove', () => {
	updateDefaultText();
	updateDebounceText();
	updateThrottleText();
});

function updateDefaultText() {
	defaultEl.textContent = parseInt(defaultEl.textContent || 0) + 1;
}

const updateDebounceText = debounce(element => {
	debounceEl.textContent = parseInt(debounceEl.textContent || 0) + 1;
});

const updateThrottleText = throttle(element => {
	throttleEl.textContent = parseInt(throttleEl.textContent || 0) + 1;
});

function debounce(cb, delay = 1000) {
	let timeout;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => cb(...args), delay);
	};
}

function throttle(cb, delay = 1000) {
	let waitingArgs = null;
	let shouldWait = false;

	function timeoutFn() {
		if (waitingArgs) {
			cb(...waitingArgs);
			waitingArgs = null;
			setTimeout(timeoutFn, delay);
		} else {
			shouldWait = false;
		}
	}

	return (...args) => {
		if (shouldWait) {
			waitingArgs = args;
			return;
		}

		cb(...args);
		shouldWait = true;

		setTimeout(timeoutFn, delay);
	};
}
