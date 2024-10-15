"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const switchButtons = document.querySelectorAll('.switch__button');
    switchButtons.forEach((button, index) => {
        const rockerSwitch = new RockerSwitch(`#temperature-scale-${index + 1}`);
    });
});
class RockerSwitch {
    constructor(buttonEl) {
        var _a;
        this._temperatureScale = "f";
        this.button = document.querySelector(buttonEl);
        (_a = this.button) === null || _a === void 0 ? void 0 : _a.addEventListener("click", this.temperatureScaleToggle.bind(this));
    }
    get temperatureScale() {
        return this._temperatureScale;
    }
    set temperatureScale(value) {
        var _a;
        this._temperatureScale = value;
        (_a = this.button) === null || _a === void 0 ? void 0 : _a.setAttribute("aria-labelledby", this._temperatureScale);
    }
    temperatureScaleToggle() {
        this.temperatureScale = this.temperatureScale === "c" ? "f" : "c";
    }
}
"use strict";

// Base URL for the API
const globalURL = "http://192.168.0.200/27";

// State variables to track button status
let isBtn1On = false;
let isBtn2On = false;
let isBtn3On = false;
let isBtn4On = false;

// Event listeners for buttons
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("temperature-scale-1").addEventListener("click", () => toggleSwitch(1));
  document.getElementById("temperature-scale-2").addEventListener("click", () => toggleSwitch(2));
  document.getElementById("temperature-scale-3").addEventListener("click", () => toggleSwitch(3));
  document.getElementById("temperature-scale-4").addEventListener("click", () => toggleSwitch(4));
});

// Function to toggle the switch and fetch from the server
function toggleSwitch(switchNumber) {
  let isOn;
  let button = document.getElementById(`temperature-scale-${switchNumber}`);

  // Determine current state and toggle
  switch (switchNumber) {
    case 1:
      isOn = isBtn1On;
      isBtn1On = !isBtn1On; // Toggle state
      break;
    case 2:
      isOn = isBtn2On;
      isBtn2On = !isBtn2On; // Toggle state
      break;
    case 3:
      isOn = isBtn3On;
      isBtn3On = !isBtn3On; // Toggle state
      break;
    case 4:
      isOn = isBtn4On;
      isBtn4On = !isBtn4On; // Toggle state
      break;
    default:
      return; // Exit if no valid switch
  }

  // Determine URL based on the state
  const url = `${globalURL}/${isOn ? "off" : "on"}`;

  // Fetch the appropriate URL
  fetch(url)
    .then(response => {
      if (response.ok) {
        // Update button text and styles based on new state
        if (isOn) {
          button.setAttribute("aria-labelledby", `c-${switchNumber}`);
          button.querySelector(`#c-${switchNumber}`).style.color = "green";
          button.querySelector(`#f-${switchNumber}`).style.color = "black";
        } else {
          button.setAttribute("aria-labelledby", `f-${switchNumber}`);
          button.querySelector(`#c-${switchNumber}`).style.color = "black";
          button.querySelector(`#f-${switchNumber}`).style.color = "red";
        }
      } else {
        console.error("Error in response:", response.statusText);
      }
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}
