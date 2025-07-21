let display = document.getElementById('display');
let currentInput = '';
let hasDecimal = false;

function appendNumber(num) {
  currentInput += num;
  updateDisplay();
}

function appendOperator(operator) {
  if (currentInput === '') return;
  if (/[+\-*/]$/.test(currentInput)) {
    currentInput = currentInput.slice(0, -1) + operator;
  } else {
    currentInput += operator;
  }
  hasDecimal = false;
  updateDisplay();
}

function appendDecimal(dot) {
  if (hasDecimal) return;
  currentInput += dot;
  hasDecimal = true;
  updateDisplay();
}

function clearDisplay() {
  currentInput = '';
  hasDecimal = false;
  updateDisplay('0');
}

function deleteLast() {
  if (currentInput.slice(-1) === '.') hasDecimal = false;
  currentInput = currentInput.slice(0, -1);
  updateDisplay(currentInput || '0');
}

function calculateResult() {
  try {
    const result = eval(currentInput);
    if (!isFinite(result)) throw new Error('Math Error');
    currentInput = result.toString();
    updateDisplay();
  } catch (e) {
    updateDisplay('Error');
    currentInput = '';
  }
}

function updateDisplay(value) {
  display.innerText = value || currentInput;
}

document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (/[0-9]/.test(key)) appendNumber(key);
  else if (['+', '-', '*', '/'].includes(key)) appendOperator(key);
  else if (key === '.') appendDecimal(key);
  else if (key === 'Enter') calculateResult();
  else if (key === 'Backspace') deleteLast();
  else if (key === 'Escape') clearDisplay();
});
