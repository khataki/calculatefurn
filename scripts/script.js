import {
  cityToSnowRegion,
  hardwarePrices,
  hardwareAnchors,
  anchorPrices,
  anchorNames,
  hardwareMapping,
  images,
  calculateHardware,
  initializeSliders,
  generateCitySelect,
  displayResults,
  calculateTotalAnchorCost,
  OrderManager,
  OrderComponent,
  calculateTotalDiscount,
  applyBulkPrices,
  applyPurchaseHistoryDiscount,
  showMessage,
} from './components.js';

document.addEventListener("DOMContentLoaded", () => {
  generateCitySelect("citySelectContainer");

  const orderManager = new OrderManager();
  const orderComponent = new OrderComponent("ordersContainer", orderManager);

  const citySelect = document.getElementById("city");
  const sandwichPanelNeedAnchorsSelect = document.getElementById("sandwichPanelNeedAnchors");
  const standRigSystemSelect = document.getElementById("standRigSystem");
  const ventFacadeNeedAnchorsSelect = document.getElementById("ventFacadeNeedAnchors");

  const calculateButton = document.getElementById("calculateButton");

  calculateButton.addEventListener("click", () => {
    calculateAndAddOrder();
  });
debugger
  document.querySelectorAll('input[name="previousPurchase"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      const isPreviousCustomer = document.querySelector('input[name="previousPurchase"]:checked').value === 'да';
      applyPurchaseHistoryDiscount(orderManager.getOrders(), hardwarePrices, isPreviousCustomer);
      applyBulkPrices(orderManager.getOrders(), hardwarePrices);
      displayOrders(orderManager.getOrders());
      displayTotalCostWithDiscount(orderManager.getOrders());
    });
  });
debugger
  function calculateAndAddOrder() {
    const inputs = {
      length: parseInt(document.getElementById("length").value, 10),
      width: parseInt(document.getElementById("width").value, 10),
      count: parseInt(document.getElementById("count").value, 10),
      city: citySelect.value,
      facade: document.getElementById("facade").value,
      glassLimit: parseInt(document.getElementById("glassLimit").value, 10),
      steel: document.querySelector('input[name="steel"]:checked').value,
      doubleKits: document.querySelector('input[name="doubleKits"]:checked').value,
      previousPurchase: document.querySelector('input[name="previousPurchase"]:checked').value,
      sandwichPanelNeedAnchors: sandwichPanelNeedAnchorsSelect ? sandwichPanelNeedAnchorsSelect.value : null,
      standRigSystem: standRigSystemSelect ? standRigSystemSelect.value : null,
      ventFacadeNeedAnchors: ventFacadeNeedAnchorsSelect ? ventFacadeNeedAnchorsSelect.value : null
    };

    if (isNaN(inputs.length) || isNaN(inputs.width) || isNaN(inputs.count) || isNaN(inputs.glassLimit)) {
      showMessage("Пожалуйста, введите корректные данные.");
      return;
    }

    if (inputs.length < 400 || inputs.length > 100000 || inputs.width < 300 || inputs.width > 2600) {
      showMessage(
        inputs.length < 400 || inputs.length > 100000
          ? "Введено слишком маленькое или большое значение для длины, обратитесь к нашим специалистам."
          : "Введено слишком маленькое или большое значение для ширины, обратите внимание, размеры вводятся в миллиметрах."
      );
      return;
    }

    const currentSnowRegion = cityToSnowRegion[inputs.city];
    const results = calculateAndDisplayResults(inputs, currentSnowRegion);
debugger
    orderComponent.createNewOrder();
    orderManager.updateOrder(orderComponent.currentOrderIndex, results);
    orderComponent.displayOrderResults();
    applyBulkPrices(orderManager.getOrders(), hardwarePrices);
    displayOrders(orderManager.getOrders());
    displayTotalCostWithDiscount(orderManager.getOrders());
    updateButtonText();
  }
debugger
  function getHardwareType(snowRegion, width, steel, doubleKits) {
    const hardwareKey = `${snowRegion}-${width}`;
    const doubleKitsKey = doubleKits === "yes" ? "_double" : "";
    const steelTypeKey = `aisi${steel.split("aisi")[1]}${doubleKitsKey}`;
    return hardwareMapping[hardwareKey]?.[steelTypeKey] || "По запросу";
  }

  function calculateAndDisplayResults(inputs, snowRegion) {
    const hardwareType = getHardwareType(snowRegion, inputs.width, inputs.steel, "no");
    const doubleHardwareType = getHardwareType(snowRegion, inputs.width, inputs.steel, "yes");
debugger
    const priceInfo = hardwarePrices[hardwareType] || { wholesale: 0, retail: 0 };
    const doublePriceInfo = hardwarePrices[doubleHardwareType] || { wholesale: 0, retail: 0 };

    const { Z, L, РСК, РСКД } = calculateHardware(inputs.length, inputs.glassLimit, inputs.doubleKits);
    const bracketCount = РСК * inputs.count;
    const doubleBracketCount = РСКД * inputs.count;
debugger
    const anchorInfo = calculateTotalAnchorCost(hardwareType, bracketCount, inputs.facade, inputs.standRigSystem, hardwareAnchors, anchorPrices, anchorNames, inputs.ventFacadeNeedAnchors);

    const glassHeight = inputs.length;
    const glassCount = Math.ceil((inputs.width * inputs.length) / (inputs.glassLimit * glassHeight)) * inputs.count;

    const doubleKitsText = inputs.doubleKits === "yes" ? "С использованием сдвоенных комплектов" : "Без использования сдвоенных комплектов";

    const basePrice = inputs.previousPurchase === "да" ? priceInfo.wholesale : priceInfo.retail;
    const hardwareCost = bracketCount * basePrice;

    const doubleBasePrice = inputs.previousPurchase === "да" ? doublePriceInfo.wholesale : priceInfo.retail;
    const doubleCost = doubleBracketCount * doubleBasePrice;

    const totalCost = hardwareCost + doubleCost;

    let randomImage;
    if (orderComponent.currentOrderIndex !== null && orderManager.getOrders()[orderComponent.currentOrderIndex]?.randomImage) {
      randomImage = orderManager.getOrders()[orderComponent.currentOrderIndex].randomImage;
    } else {
      const randomIndex = Math.floor(Math.random() * images.length);
      randomImage = images[randomIndex];
    }

    const resultData = {
      orderIndex: orderComponent.currentOrderIndex !== null ? orderComponent.currentOrderIndex : orderManager.getOrders().length,
      hardwareType,
      bracketCount,
      basePrice,
      hardwareCost,
      doubleHardwareType,
      doubleBracketCount,
      doubleBasePrice,
      doubleCost,
      totalCost,
      doubleKitsText,
      inputs,
      anchorInfo,
      glassCount,
      snowRegion,
      Z,
      L: Math.ceil(L),
      РСК,
      РСКД,
      randomImage // Save the image in the order data
    };

    displayResults(resultData, images, anchorPrices, anchorNames);

    return resultData;
  }

  function displayTotalCostWithDiscount(orders) {
    const totalCost = orders.reduce((acc, order) => acc + order.totalCost, 0);
    const totalBracketCount = orders.reduce((acc, order) => acc + order.bracketCount, 0);
    const discountedTotal = calculateTotalDiscount(totalCost, totalBracketCount);

    console.log(`Total cost: ${totalCost}, Total bracket count: ${totalBracketCount}`);
    console.log(`Total cost after discount: ${discountedTotal}`);

    const totalCostElement = document.querySelector(".total-cost");
    if (totalCostElement) {
      totalCostElement.innerHTML = `<h2>Общая стоимость со скидкой: <span class="total-cost-value">${discountedTotal.toFixed(2)}</span> руб.</h2>`;
    } else {
      const newTotalCostElement = document.createElement("div");
      newTotalCostElement.className = "total-cost";
      newTotalCostElement.innerHTML = `<h2>Общая стоимость со скидкой: <span class="total-cost-value">${discountedTotal.toFixed(2)}</span> руб.</h2>`;
      document.getElementById("ordersContainer").appendChild(newTotalCostElement);
    }
  }
debugger
  function displayOrders(orders) {
    const ordersContainer = document.getElementById("ordersContainer");
    ordersContainer.innerHTML = "";

    if (!Array.isArray(orders)) {
      console.error("Orders should be an array.");
      return;
    }

    if (orders.length === 0) {
      const noOrdersElement = document.createElement("div");
      noOrdersElement.className = "no-orders";
      noOrdersElement.innerHTML = "<p>Заказы отсутствуют.</p>";
      ordersContainer.appendChild(noOrdersElement);
      displayTotalCostWithDiscount([]);
      return;
    }

    orders.forEach((order, index) => {
      const orderElement = document.createElement("div");
      orderElement.className = "order-item";
      orderElement.setAttribute("data-index", index);
      orderElement.innerHTML = `
        <h3 class="order-title">
          Комплект №${index + 1}
          <button class="delete-button" data-index="${index}"><i class="fa-solid fa-xmark"></i></button>
        </h3>
        <div class="order-details">
          <div class="order-summary">
            <div class="order-info">
              <ul class="result-description">
                <li class="result-description">Исходные размеры козырька:</li>
                <li class="result-description">Ширина: ${order.inputs.width} мм</li>
                <li class="result-description">Длина: ${order.inputs.length} мм</li>
                <li class="result-description">Ограничение по длине стекла: ${order.inputs.glassLimit} мм</li>
                <li class="result-description">Количество: ${order.inputs.count} шт</li>
              </ul>
              <p class="result-description">Вариант с ${order.inputs.doubleKits === "yes" ? "использованием сдвоенных комплектов" : "использованием одиночных комплектов"}, сталь ${order.inputs.steel}:</p>
              ${order.bracketCount > 0 ? `
              <p class="result-description">Комплект ${order.hardwareType} - ${order.bracketCount} штук * ${order.basePrice} руб/шт = ${order.hardwareCost} руб.</p>
              ` : ''}
              ${order.doubleBracketCount > 0 ? `
              <p class="result-description">Комплект ${order.doubleHardwareType} - ${order.doubleBracketCount} компл * ${order.doubleBasePrice} руб/компл. = ${order.doubleCost} руб.</p>
              ` : ''}
              ${order.anchorInfo.totalAnchorCount > 0 && order.anchorInfo.anchorName !== "не используется" ? `
              <p class="result-description">${order.anchorInfo.anchorName} - ${order.anchorInfo.totalAnchorCount} штук * ${anchorPrices[order.inputs.facade]} руб/шт = ${order.anchorInfo.totalAnchorCost} руб.</p>
              ` : ''}
              <p class="result-description">Цена фурнитуры на один козырёк: ${order.hardwareCost + order.doubleCost + order.anchorInfo.totalAnchorCost} рублей с НДС</p>
            </div>
            <div class="image-container">
              <img id="orderImage${index}" src="images/${order.randomImage}" alt="Фурнитура">
            </div>
          </div>
        </div>
      `;
      ordersContainer.appendChild(orderElement);

      // Add detailed order information to the console
      console.log(`
        Ваш заказ:
        Комплект №${index + 1}
        Исходные размеры козырька:
        Ширина (вылет): ${order.inputs.width} мм
        Длина (вдоль здания): ${order.inputs.length} мм
        Ограничение по длине стекла: ${order.inputs.glassLimit} мм
        Количество: ${order.inputs.count} шт

        Вариант с ${order.inputs.doubleKits === "yes" ? "использованием сдвоенных комплектов" : "использованием одиночных комплектов"}, сталь ${order.inputs.steel} рублей (на один козырёк):
        ${order.bracketCount > 0 ? `
        1. Дистанционный кронштейн - ${order.bracketCount} штук * ${order.basePrice} руб/шт = ${order.hardwareCost} руб.
        ` : ''}
        ${order.doubleBracketCount > 0 ? `
        2. Комплект ${order.doubleHardwareType} - ${order.doubleBracketCount} компл * ${order.doubleBasePrice} руб/компл. = ${order.doubleCost} руб.
        ` : ''}
        ${order.anchorInfo.totalAnchorCount > 0 && order.anchorInfo.anchorName !== "не используется" ? `
        3. ${order.anchorInfo.anchorName} - ${order.anchorInfo.totalAnchorCount} штук * ${anchorPrices[order.inputs.facade]} руб/шт = ${order.anchorInfo.totalAnchorCost} руб.
        ` : ''}
        
        ЦЕНА фурнитуры на один козырёк: ${order.hardwareCost + order.doubleCost + order.anchorInfo.totalAnchorCost} рублей с НДС
      `);

      const deleteButton = orderElement.querySelector(".delete-button");
      deleteButton.addEventListener("click", () => {
        removeOrder(index);
      });
    });

    displayTotalCostWithDiscount(orders); // Пересчитываем и отображаем общую стоимость после рендеринга заказов
  }

  function removeOrder(index) {
    const orderElement = document.querySelector(`.order-item[data-index="${index}"]`);
    if (orderElement) {
      orderElement.classList.add("hide");
      setTimeout(() => {
        orderManager.deleteOrder(index);
        displayOrders(orderManager.getOrders());
        updateButtonText();
      }, 500);
    }
  }
debugger
  function updateButtonText() {
    const button = document.getElementById("calculateButton");
    const orders = orderManager.getOrders();

    if (orders.length === 0) {
      button.innerHTML = '<i class="fas fa-calculator"></i> Рассчитать';
    } else {
      button.innerHTML = '<i class="fas fa-plus"></i> Добавить к заказу';
    }
  }

  initializeSliders(showMessage);
  updateButtonText(); // Initial button text update
});
