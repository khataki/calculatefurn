// results.js
export function displayResults({
  hardwareType, bracketCount, basePrice, hardwareCost, doubleHardwareType, doubleBracketCount, doubleBasePrice, doubleCost, totalCost, doubleKitsText, inputs, anchorInfo, glassCount, snowRegion, Z, L, РСК, РСКД
}, images, anchorPrices, anchorNames) {
  let resultHTML = `
    <h2>Результаты подбора фурнитуры</h2>
    <p class="result-description">Для реализации вашего проекта вам понадобится следующая фурнитура:</p>
    <p class="result-description">Тип козырька: ${hardwareType}</p>
    <p class="result-description">${doubleKitsText}, сталь ${inputs.steel}:</p>
    ${bracketCount > 0 ? `<p class="result-description">${hardwareType} - ${bracketCount} штук * ${basePrice} руб/шт = ${hardwareCost} рублей</p>` : ""}
  `;

  if (doubleBracketCount > 0) {
    resultHTML += `
      <p class="result-description">${doubleHardwareType} - ${doubleBracketCount} штук * ${doubleBasePrice} руб/шт = ${doubleCost} рублей</p>
    `;
  }

  if (anchorInfo.totalAnchorCost > 0) {
    resultHTML += `
      <p class="result-description">${anchorInfo.anchorName} - ${anchorInfo.totalAnchorCount} штук * ${anchorPrices[inputs.facade] || 0} руб/шт = ${anchorInfo.totalAnchorCost} рублей</p>
    `;
  }

  resultHTML += `
    <h3>Итоговая стоимость</h3>
    <p class="result-description">Общая стоимость фурнитуры: ${totalCost + anchorInfo.totalAnchorCost} рублей с НДС.</p>
    <p class="result-description">Размеры стёкол козырька: ${inputs.glassLimit}x${inputs.length} мм, количество: ${glassCount} штук.</p>
    <p class="result-description">Снеговой район: ${snowRegion}</p>
    <p class="result-description">Количество стёкол: ${Z}</p>
    <p class="result-description">Длина стекла: ${L} мм</p>
    <p class="result-description">РСК: ${РСК}, РСКД: ${РСКД}</p>
  `;

  const results = document.querySelector(".results");
  results.innerHTML = resultHTML;

  const randomIndex = Math.floor(Math.random() * images.length);
  const randomImage = images[randomIndex];
  document.getElementById("randomImage").src = `images/${randomImage}`;
}
