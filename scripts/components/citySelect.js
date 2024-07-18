import { cities } from './dataBase.js';

export function generateCitySelect(containerId) {
  const container = document.getElementById(containerId);
  
  if (!container) {
    console.error(`Container with ID ${containerId} not found`);
    return;
  }

  let selectHTML = `
    <div class="select-container">
      <label for="city">Город установки козырька</label>
      <select id="city" name="city">
  `;

  cities.forEach(city => {
    selectHTML += `<option value="${city}">${city}</option>`;
  });

  selectHTML += `
      </select>
    </div>
  `;

  container.innerHTML = selectHTML;
}