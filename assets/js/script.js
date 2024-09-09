// Handle form submission.
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = this;
  const inputs = form.querySelectorAll("input, textarea");
  let hasError = false;
  // Check if all required fields are filled.
  inputs.forEach((input) => {
    // Handle checkboxes and radio buttons differently.
    if (
      (input.type === "radio" || input.type === "checkbox") &&
      !input.checked
    ) {
      // For radio and checkboxes, check if they are checked.
      if (input.type === "radio") {
        hasError = handleRadioChange();
      } else {
        document.querySelector(".userConsent").classList.remove("hidden");
        hasError = true;
      }
    } else if (
      input.type !== "radio" &&
      input.type !== "checkbox" &&
      input.value === ""
    ) {
      // For other inputs and textarea, check if the value is empty.
      // Add required attribute to the empty fields.
      input.setAttribute("required", "true");
      hasError = true;
    }
  });

  if (!hasError) {
    // If no error, submit the form.
    // form.submit();
    document.getElementById("success").classList.remove("hidden");
    // Reset the form after submission.
    form.reset();
    inputs.forEach((input) => {
      input.removeAttribute("required");
    });
    // Hide the success message after 5 seconds.
    setTimeout(() => {
      document.getElementById("success").classList.add("hidden");
    }, 5000);
  }
});

// Handle radio and checkbox toggle.
const checkbox = document.querySelector("input[type=checkbox]");
const radios = document.querySelectorAll("input[type=radio]");
const queryType = document.querySelector(".queryType");

// For checkbox.
checkbox.addEventListener("change", function () {
  if (!this.checked) {
    document.querySelector(".userConsent").classList.remove("hidden");
  } else {
    document.querySelector(".userConsent").classList.add("hidden");
  }
});

// Function to handle radio button change.
function handleRadioChange() {
  // Check if any of the radio is checked
  let isChecked = false;

  radios.forEach((radio) => {
    if (radio.checked) {
      isChecked = true;
    }
  });

  if (isChecked) {
    queryType.classList.add("hidden");
  } else {
    queryType.classList.remove("hidden");
    return true;
  }
}

// Add event listener to each radio button.
radios.forEach((radio) => {
  radio.addEventListener("change", handleRadioChange);
});
