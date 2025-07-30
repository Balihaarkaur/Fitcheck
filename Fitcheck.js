let chartInstance = null;

function analyzeHealth() {
  const age = Number(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const weight = Number(document.getElementById("weight").value);
  const height = Number(document.getElementById("height").value);

  if (!age || !weight || !height) {
    alert("Please fill in all the fields.");
    return;
  }

  const bmi = weight / (height * height);
  let status = "";
  let tip = "";

  if (bmi < 18.5) {
    status = "Underweight";
    tip = "Eat more calories, proteins, and exercise moderately.";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    status = "Healthy";
    tip = "Keep up your balanced lifestyle!";
  } else if (bmi >= 25 && bmi < 29.9) {
    status = "Overweight";
    tip = "Try to incorporate more physical activity into your day.";
  } else {
    status = "Obese";
    tip = "Consult a health expert for diet and workout plans.";
  }

  if (gender === "female" && age < 25) {
    tip += " Also ensure iron-rich foods are in your diet.";
  } else if (gender === "male" && age > 40) {
    tip += " Consider regular heart checkups.";
  }

  document.getElementById("output").innerHTML = `
    <p>Your BMI is: <span>${bmi.toFixed(2)}</span></p>
    <p>Status: <span>${status}</span></p>
    <p>Health Tip: ${tip}</p>
  `;

  localStorage.setItem("lastBMI", bmi.toFixed(2));

  // Chart data
  const ctx = document.getElementById("bmiChart").getContext("2d");
  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Underweight", "Healthy", "Overweight", "Obese"],
      datasets: [{
        label: "BMI Ranges",
        data: [18.5, 24.9, 29.9, bmi],
        backgroundColor: [
          "#f39c12", "#2ecc71", "#e67e22", "#e74c3c"
        ],
        borderColor: "#333",
        borderWidth: 1
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "BMI Category Comparison"
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 40
        }
      }
    }
  });
}
