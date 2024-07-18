// slider.js

export function updateSliderValue(slider, valueDisplayId, showMessage) {
    const value = slider.value;
    document.getElementById(valueDisplayId).innerText = value;
  
    const values = document.querySelectorAll(".slider-values .value");
    values.forEach((span) => {
      const spanValue = parseInt(span.getAttribute("data-value"), 10);
      span.classList.toggle("active", spanValue <= value);
    });
  
    if (slider.id === "width") {
      if (value < 300) {
        showMessage("Введено слишком маленькое значение, обратите внимание, размеры вводятся в миллиметрах.");
      } else if (value > 2600) {
        showMessage("Фурнитура для козырьков шириной свыше 2600 мм изготавливаются по запросу, обратитесь к нашим специалистам.");
      }
    }
  
    if (slider.id === "length") {
      if (value < 400) {
        showMessage("Введено слишком маленькое значение, обратите внимание, размеры вводятся в миллиметрах.");
      } else if (value > 100000) {
        showMessage("Введено слишком большое значение, обратитесь к нашим специалистам.");
      }
    }
  }
  
  export function initializeSliders(showMessage) {
    document.querySelectorAll('input[type="range"]').forEach((slider) => {
      const percent = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
      slider.style.setProperty("--percent", `${percent}%`);
      slider.classList.add("progress");
  
      slider.addEventListener("input", () => {
        const percent = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
        slider.style.setProperty("--percent", `${percent}%`);
        updateSliderValue(slider, slider.id === "width" ? "widthValue" : "lengthValue", showMessage);
      });
  
      updateSliderValue(slider, slider.id === "width" ? "widthValue" : "lengthValue", showMessage);
    });
  }
  