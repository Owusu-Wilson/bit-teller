// 💡🔆🔅☀

const lightsObject = {
  lightOn: { bitValue: 1, image: "./assets/images/bulb-on.png" },
  lightOff: { bitValue: 0, image: "./assets/images/bulb-off.png" },
};

let number_of_bits = 0;
let user_input = 0;
let computed_binary_text = "";
console.log("Scripts Started...");

// SELECTING ELEMENTS
let bit_switch = document.getElementsByClassName("switch");
// Get the input element by its ID
const inputField = document.getElementById("input");

const switches = document.querySelectorAll(".switch");
// Get all bulb elements
const bulbs = document.querySelectorAll(".bulb");

// Get the h2 element where you want to display the value
const outputElement = document.getElementById("output");
const limitElement = document.getElementById("limit");
const clearButton = document.getElementById("reset-button");

// EVENT HANDLERS

// Add click event listener to each switch
switches.forEach((switchElement) => {
  switchElement.addEventListener("click", () => {
    // Clear the number input field
    inputField.value = user_input;
    // Remove 'active' class from all switch elements
    switches.forEach((switchEl) => {
      switchEl.querySelector("h2").classList.remove("active");
    });

    // Toggle the 'active' class when the switch is clicked
    switchElement.querySelector("h2").classList.toggle("active");
    // Log the text content of the clicked h2 element
    const value = switchElement.querySelector("h2").textContent;
    console.log("Clicked value:", value);
    limitElement.innerText = Math.pow(2, value) - 1;
    number_of_bits = Number(value);

    // Hide all bulbs
    bulbs.forEach((bulb) => {
      bulb.style.display = "none";
    });

    // Show the required number of bulbs
    for (let i = 0; i < number_of_bits; i++) {
      bulbs[i].style.display = "block";
    }
  });
});

// Add an event listener to the input element
inputField.addEventListener("input", function (event) {
  // Log the value of the input field when it changes
  let inputValue = event.target.value;
  user_input = Number(inputValue);
  let binary_number = toBinary(Number(inputValue), number_of_bits);
  computed_binary_text = String(binary_number);
  console.log(event.target.value);
  // Set the value of the h2 element to the input value

  //   UPDATING THE BULBS
  // Loop through each bulb element
  bulbs.forEach((bulb, index) => {
    // Determine the index from the back
    const reverseIndex = number_of_bits - 1 - index;
    // Get the img element inside the current bulb
    const img = bulb.querySelector("img");

    // Determine if the bulb should be on or off based on the computed binary value
    const isBulbOn = computed_binary_text.charAt(index) === "1";

    // Update the src attribute of the img element based on whether the bulb should be on or off
    img.src = isBulbOn
      ? "./assets/images/bulb-on.png"
      : "./assets/images/bulb-off.png";

    // Update the alt attribute for accessibility
    img.alt = isBulbOn ? `Bulb On` : "Bulb Off";

    // Update the text content of the h2 element based on whether the bulb should be on or off
    bulb.querySelector("span").textContent = isBulbOn
      ? `${reverseIndex}`
      : `${reverseIndex}`;
    bulb.querySelector("figure").textContent = isBulbOn
      ? `${Math.pow(2, reverseIndex)}`
      : `${Math.pow(2, reverseIndex)}`;
    bulb.querySelector("figure").style.color = isBulbOn
      ? "black"
      : "rgb(180, 180, 180)";
  });

  outputElement.innerText = `${inputValue} | ${binary_number}`;
});

clearButton.addEventListener("click", function (event) {
  inputField.value = "";
});

function toBinary(number, nBits) {
  // Check if the input is a valid number
  if (typeof number !== "number" || isNaN(number)) {
    return "Invalid input";
  }

  // Check if the number of bits is a valid number
  if (typeof nBits !== "number" || isNaN(nBits) || nBits <= 0) {
    return "Invalid number of bits";
  }

  // Calculate the maximum value that can be represented with the given number of bits
  const maxValue = Math.pow(2, nBits) - 1;

  // Check if the input number exceeds the maximum value
  if (number > maxValue) {
    return (
      "Input number exceeds the maximum value representable with " +
      nBits +
      " bits"
    );
  }

  // Handle special case when the input is 0
  if (number === 0) {
    return "0";
  }

  let binary = ""; // Initialize an empty string to store the binary representation

  // Convert the number to binary
  while (number > 0) {
    // Get the remainder when dividing the number by 2
    const remainder = number % 2;

    // Prepend the remainder to the binary string
    binary = remainder + binary;

    // Divide the number by 2 and get the integer part
    number = Math.floor(number / 2);
  }

  // Pad the binary string with leading zeros if necessary
  while (binary.length < nBits) {
    binary = "0" + binary;
  }

  return binary;
}

// Test the function
console.log(toBinary(10, 4)); // Output: "1010"
console.log(toBinary(42, 6)); // Output: "101010"
console.log(toBinary(0, 3)); // Output: "000"
console.log(toBinary(123, 8)); // Output: "01111011"
