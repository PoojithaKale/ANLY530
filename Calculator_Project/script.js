// Switch tabs
function switchTab(tab) {
  document.getElementById('calculator-tab').style.display = tab === 'calculator' ? 'block' : 'none';
  document.getElementById('graphing-tab').style.display = tab === 'graphing' ? 'block' : 'none';
}

// Scientific Calculator Logic
let calcInput = '';

function appendValue(value) {
  calcInput += value;
  updateCalcDisplay();
}

function operate(op) {
  calcInput += op;
  updateCalcDisplay();
}

function calculate() {
  try {
    calcInput = eval(calcInput).toString();
    updateCalcDisplay();
  } catch (e) {
    alert('Invalid Expression');
  }
}

function clearDisplay() {
  calcInput = '';
  updateCalcDisplay();
}

function updateCalcDisplay() {
  document.getElementById('calc-display').value = calcInput;
}

// Graphing Calculator Logic
function plotGraph() {
  const equation = document.getElementById('equation').value;

  if (!equation) {
    alert('Please enter a valid function!');
    return;
  }

  const parsedEquation = equation
    .replace(/\^/g, '**')
    .replace(/sin/g, 'Math.sin')
    .replace(/cos/g, 'Math.cos')
    .replace(/tan/g, 'Math.tan')
    .replace(/log/g, 'Math.log')
    .replace(/sqrt/g, 'Math.sqrt');

  const xValues = [];
  const yValues = [];

  for (let x = -10; x <= 10; x += 0.1) {
    xValues.push(x);
    try {
      yValues.push(eval(parsedEquation.replace(/x/g, `(${x})`)));
    } catch (e) {
      alert('Invalid Function');
      return;
    }
  }

  renderGraph(xValues, yValues);
}

function renderGraph(xValues, yValues) {
  const ctx = document.getElementById('graphCanvas').getContext('2d');

  if (window.graphChart) {
    window.graphChart.destroy();
  }

  window.graphChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: xValues,
      datasets: [
        {
          label: 'f(x)',
          data: yValues,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        x: { title: { display: true, text: 'x-axis' } },
        y: { title: { display: true, text: 'y-axis' } },
      },
    },
  });
}
