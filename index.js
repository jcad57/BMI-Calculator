"use strict";

// Connect to DOM elements
const metricRadioBtnElement = document.getElementById("metric");
const imperialRadioBtnElement = document.getElementById("imperial");
const allRadioBtnElements = document.querySelectorAll("input[name=unit-select]");
const metricContainerElement = document.querySelector(".bmi__input-container--metric");
const imperialContainerElement = document.querySelector(".bmi__input-container--imperial");

const metricHeightInputElement = document.getElementById("metric-height");
const metricWeightInputElement = document.getElementById("metric-weight");
const imperialHeightFeetInputElement = document.getElementById("imperial-height-ft");
const imperialHeightInchInputElement = document.getElementById("imperial-height-in");
const imperialWeightInputElement = document.getElementById("imperial-weight");
const allInputElements = document.querySelectorAll("input[type=text]");

const bmiResultsContainerElement = document.querySelector(".bmi__results-container");
const bmiResultsDefaultMessageElement = document.querySelector(".bmi__default-message");
const bmiResultsSectionElement = document.querySelectorAll(".bmi__results-container--section");
const bmiResultsScoreElement = document.querySelector(".bmi__results-container--results-score");
const bmiResultsMessageElement = document.querySelector(".bmi__results-container--results-text");
const bmiResultsNotCalculatedElement = document.querySelector(".results-not-calculated");
const bmiResultsCalculatedElement = document.querySelector(".results-calculated");

// Set up functions
const clearAllInputs = function () {
  // Reset all input fields
  allInputElements.forEach((input) => {
    input.value = "";
  });
  // Switch results container back to Welcome message
  bmiResultsCalculatedElement.classList.add("hidden");
  bmiResultsNotCalculatedElement.classList.remove("hidden");
};

const checkAllInputFields = function () {
  // Calculate the BMI score and update dynamically with input
  bmiResultsScoreElement.innerHTML = `${calculateBMIResult(
    metricHeightInputElement.value,
    metricWeightInputElement.value,
    imperialHeightFeetInputElement.value,
    imperialHeightInchInputElement.value,
    imperialWeightInputElement.value
  )}`;

  // Only display score if all appropriate fields are filled out
  if (metricRadioBtnElement.checked) {
    if (
      metricHeightInputElement.value === "" ||
      metricWeightInputElement.value === "" ||
      metricHeightInputElement.value === "null" ||
      metricWeightInputElement.value === "null"
    ) {
      hideBMIResultElement();
    } else {
      showBMIResultElement();
    }
  } else {
    if (
      imperialHeightFeetInputElement.value === "" ||
      imperialHeightInchInputElement.value === "" ||
      imperialWeightInputElement.value === "" ||
      imperialHeightFeetInputElement.value === "null" ||
      imperialHeightInchInputElement.value === "null" ||
      imperialWeightInputElement.value === "null"
    ) {
      hideBMIResultElement();
    } else {
      showBMIResultElement();
    }
  }
};

const showBMIResultElement = function () {
  bmiResultsCalculatedElement.classList.remove("hidden");
  bmiResultsNotCalculatedElement.classList.add("hidden");
};

const hideBMIResultElement = function () {
  bmiResultsCalculatedElement.classList.add("hidden");
  bmiResultsNotCalculatedElement.classList.remove("hidden");
};

const calculateBMIResult = function (cm, kg, ft, inch, lbs) {
  let bmi;
  let bmiResultMessage;
  if (metricRadioBtnElement.checked) {
    // Calculate BMI for Metric input
    bmi = Math.round((kg / cm / cm) * 10000 * 10) / 10;
  } else {
    // Calculate BMI for Imperial input
    const totalHeight = ft * 12 + Number(inch);
    bmi = Math.round((lbs / (totalHeight * totalHeight)) * 703 * 10) / 10;
  }

  // Set the output message inside the BMI results container
  if (bmi < 18.5) {
    bmiResultMessage = "underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiResultMessage = "a healthy weight";
  } else if (bmi >= 25 && bmi < 30) {
    bmiResultMessage = "overweight";
  } else {
    bmiResultMessage = "obese";
  }

  bmiResultsMessageElement.innerHTML = `Your BMI suggests you’re ${bmiResultMessage}. Your ideal weight is between <span class="bmi__results-container--suggested-weight"> ${
    metricRadioBtnElement.checked ? `63.3kgs - 85.2kgs` : `140lbs - 188lbs`
  }.</span>`;

  return bmi;
};

// Event Listeners

// Display correct input fields based on selected unit radio button
allRadioBtnElements.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (metricRadioBtnElement.checked) {
      metricContainerElement.classList.remove("hidden");
      imperialContainerElement.classList.add("hidden");
    } else {
      if (imperialRadioBtnElement.checked) {
        imperialContainerElement.classList.remove("hidden");
        metricContainerElement.classList.add("hidden");
      }
    }
    clearAllInputs();
  });
});

// Dynamically update BMI if value changes on any input field
allInputElements.forEach((input) => {
  input.addEventListener("input", checkAllInputFields);
});
