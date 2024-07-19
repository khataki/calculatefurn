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
  calculateTotalAnchorCost,
  OrderManager,
  OrderComponent,
  calculateTotalDiscount,
  showMessage,
} from './components.js';

function count_as() {
  var countsss = 0;
  // // Получаем контейнер по id
  const ordersContainer = document.getElementById('ordersContainer');
  // Проверяем, что контейнер существует
  if (ordersContainer) {
    // Получаем все элементы с классом .order-item внутри контейнера
    const orderItems = ordersContainer.getElementsByClassName('order-item');
    // Проходимся циклом по найденным элементам и делаем с ними что-то
    for (let i = 0; i < orderItems.length; i++) {
      const orderItem = orderItems[i];
      // Здесь можно выполнять операции с каждым элементом .order-item
      // console.log(orderItem.innerHTML); // Пример вывода текста элемента в консоль
      var dsadasdas = orderItem.querySelector(".order-details").querySelector(".order-summary").querySelector(".order-info").querySelectorAll("p")['1'];
      // console.log(dsadasdas);
      // Удаление слова "Комплект" и всего после знака "-"
      let match = dsadasdas.innerHTML.match(/- (.*?) штук/);
      let value222 = match[1].trim(); /// Количество
      countsss += Number(value222);
      // Вывод результата
      // console.log(result); // "[ РСК 50/304 ]"
      // console.log("\n ->"+ddadads['1']+"\n");
      // Извлекаем часть строки между знаком "-" и словом "штук"
      // arr.get(result)
    }
  } else {
    console.error('Элемент с id "ordersContainer" не найден.');
  }
  return countsss;
}

function count_as2() {
  var countsss = 0;
  // // Получаем контейнер по id
  const ordersContainer = document.getElementById('ordersContainer');
  // Проверяем, что контейнер существует
  if (ordersContainer) {
    // Получаем все элементы с классом .order-item внутри контейнера
    const orderItems = ordersContainer.getElementsByClassName('order-item');
    // Проходимся циклом по найденным элементам и делаем с ними что-то
    for (let i = 0; i < orderItems.length; i++) {
      const orderItem = orderItems[i];
      // Здесь можно выполнять операции с каждым элементом .order-item
      // console.log(orderItem.innerHTML); // Пример вывода текста элемента в консоль
      var dsadasdas3 = orderItem.querySelector(".order-details").querySelector(".order-summary").querySelector(".order-info").querySelectorAll("p")['2'];
      let startsWithKomplekt = dsadasdas3.innerHTML.startsWith("Комплект");
      // Вывод результата
      // console.log("\n ffff => "+startsWithKomplekt+" \n"); // true
      if (startsWithKomplekt) { /// Комплект РСКУ-Д 14/304 - 1 компл * 22170.00 руб/компл. = 22170 руб.
        var dsadasdas = orderItem.querySelector(".order-details").querySelector(".order-summary").querySelector(".order-info").querySelectorAll("p")['2'];
        // console.log(dsadasdas);
        // Удаление слова "Комплект" и всего после знака "-"
        let match = dsadasdas.innerHTML.match(/- (.*?) компл/);
        let value222 = match[1].trim(); /// Количество
        countsss += Number(value222);
      }
      // Вывод результата
      // console.log(result); // "[ РСК 50/304 ]"
      // console.log("\n ->"+ddadads['1']+"\n");
      // Извлекаем часть строки между знаком "-" и словом "штук"
      // arr.get(result)
    }
  } else {
    console.error('Элемент с id "ordersContainer" не найден.');
  }
  return countsss;
}

function updateSliderValue() {
  // console.log("\n=>" + count_as() + "\n");
  var asdasdasd = count_as(); /// Количесто для скидок всео 
  // var fff1 = document.querySelector("#ordersContainer");
  var fff2 = document.querySelector("#widthValue").innerHTML; /// Ширина (вылет) козырька, мм
  // console.log(fff2);
  let arr = new Map([
    ['РСК 50/304', '8680-9900'],
    ['РСК 60/304', '9400-10470'],
    ['РСК 50/316', '10180-11700'],
    ['РСК 60/316', '10800-12320'],
    ['РСКУ 60/304', '12220-13870'],
    ['РСКУ 60/316', '14620-16120'],
    ['РСК-Д 50/304', '11800-13000'],
    ['РСК-Д 60/304', '12800-13700'],
    ['РСК-Д 50/316', '13770-15340'],
    ['РСК-Д 60/316', '14500-16000'],
    ['РСКУ-Д 60/304', '16748-18800'],
    ['РСКУ-Д 60/316', '19848-21700'],
    ['РСК 14/304', '10900-12050'],
    ['РСК 14/316', '12420-14200'],
    ['РСК-Д 14/304', '14650-16200'],
    ['РСК-Д 14/316', '16600-18980'],
    ['РСКУ 14/304', '14580-16030'],
    ['РСКУ 14/316', '16800-18980'],
    ['РСКУ-Д 14/304', '19802-22170'],
    ['РСКУ-Д 14/316', '22732-26150'],
    ['РСК 16/304', '12840-14190'],
    ['РСК 16/316', '14500-16700'],
    ['РСК-Д 16/304', '17740-19200'],
    ['РСК-Д 16/316', '19800-21450'],
    ['РСКУ 16/304', '16520-18170'],
    ['РСКУ 16/316', '18880-21480'],
    ['РСКУ-Д 16/304', '22892-25170'],
    ['РСКУ-Д 16/316', '25932-28620']
  ]);
  var dasasdasdasd = 0;
  let discountAmount = 0;
  let discountAmount2 = 0;
  // // Получаем контейнер по id
  const ordersContainer = document.getElementById('ordersContainer');
  // Проверяем, что контейнер существует
  if (ordersContainer) {
    // Получаем все элементы с классом .order-item внутри контейнера
    const orderItems = ordersContainer.getElementsByClassName('order-item');
    // Проходимся циклом по найденным элементам и делаем с ними что-то
    for (let i = 0; i < orderItems.length; i++) {
      const orderItem = orderItems[i];
      // Здесь можно выполнять операции с каждым элементом .order-item
      // console.log(orderItem.innerHTML); // Пример вывода текста элемента в консоль  order-info
      var dsadasdas = orderItem.querySelector(".order-details").querySelector(".order-summary").querySelector(".order-info").querySelectorAll("p")['1'];
      // result-description
      function processString(input) {
        // Находим индекс знака равно
        let equalsIndex = input.indexOf('=');
        // Находим индекс слова "руб" после знака равно
        let rubIndex = input.indexOf('руб', equalsIndex);
        // Извлекаем подстроку между знаком равно и словом "руб"
        let result = input.substring(equalsIndex + 1, rubIndex);
        // Удаляем все пробелы
        result = result.replace(/\s+/g, '');
        return result;
      }
      var dsadsad = orderItem.querySelector(".order-details").querySelector(".order-summary").querySelector(".order-info").querySelectorAll("p").length;
      let dasdasdasda;
      let outputString;
      let dsadsadasd = 0;
      var sr;
      if (Number(dsadsad) == 3) {
        sr = 2;
      } else if (Number(dsadsad) == 4) {
        sr = 3;
      } else if (Number(dsadsad) == 5) {
        sr = 4;
      }
      if (orderItem.querySelector("#fe1123")) {
        let fdfdssdfsdf = orderItem.querySelector("#fe1123").innerHTML;
        dasdasdasda = fdfdssdfsdf;
        outputString = Number(processString(dasdasdasda));
        // console.log("\n  sss "  + fdfdssdfsdf);
      } else {
        outputString = 0;
      }
      // fe1123
      // console.log("\n Цыфра = "+outputString+" \n");
      var dsadasdas2 = orderItem.querySelector(".order-details").querySelector(".order-summary").querySelector(".order-info").querySelectorAll("p")[sr];
      // console.log("\nКоличество => "+dsadsad+" \n");
      // console.log(dsadasdas);
      // Удаление слова "Комплект" и всего после знака "-"
      let result = dsadasdas.innerHTML.replace(/Комплект\s*|-.*/g, '').trim(); ////  РСК 50/304       
      let match = dsadasdas.innerHTML.match(/- (.*?) штук/);
      let value222 = match[1].trim(); /// Количество
      let ddadads = arr.get(result).split('-'); /// ['РСК 50/304', '8680-9900'],   [0] = 8680 [1] = 9900
      let fsfsffsd1 = document.querySelector("#previousPurchaseYes").checked; /// Покупали ли раньше в нашей организации   true, false
      var dsadasdas3 = orderItem.querySelector(".order-details").querySelector(".order-summary").querySelector(".order-info").querySelectorAll("p")['2'];
      let startsWithKomplekt = dsadasdas3.innerHTML.startsWith("Комплект");
      // Вывод результата
      // console.log("\n ffff => "+startsWithKomplekt+" \n"); // true
      var asdasdasd2 = 0; /// Количесто для скидок всео 
      var value2222;
      let result2;
      let ddadads2;
      if (fsfsffsd1 == true) {
        if (startsWithKomplekt) {
          asdasdasd2 = count_as2(); /// Количесто для скидок всео 
          let text = dsadasdas3.innerHTML;
          let parts = text.split('-'); // Разделяем строку по дефисам
          if (parts.length > 2) {
            parts = parts.slice(0, 2); // Оставляем только первые две части
          }
          result2 = parts.join('-').replace(/Комплект\s*/g, '').trim(); // Объединяем обратно и убираем "Комплект"
          // let result2 = dsadasdas3.innerHTML.replace(/Комплект\s*|-.*/g, '').trim();   ////  РСК 50/304      
          let match2 = dsadasdas3.innerHTML.match(/- (.*?) компл/);
          value2222 = match2[1].trim(); /// Количество
          ddadads2 = arr.get(result2).split('-'); /// ['РСК 50/304', '8680-9900'],   [0] = 8680 [1] = 9900
          // console.log("\n Тип => "+result2+" \n"); 
          // console.log("\n Тип цена => "+ddadads2[0]+" \n"); 
          // console.log("\n Количество => "+value2222+" \n"); 
          // console.log("\n Суммарно комплектов => "+asdasdasd2+" \n"); 
        } else {
          asdasdasd2 = 0;
        }
        // console.log("\n Тип цена => "+ddadads2[0]+" \n"); 
        // console.log("\n=>ssss1="+Number(asdasdasd)+"\n"); 
        // console.log("\n=>ssss2="+Number(asdasdasd2)+"\n");  
        let pricess1 = 0;
        var discountPercentage = 0;
        let fsdfsdfsdf = Number(asdasdasd) + Number(asdasdasd2);
        console.log("\n=>ssss2=" + Number(fsdfsdfsdf) + "\n");
        if (fsdfsdfsdf <= 25) { /// Оптовая
          discountPercentage = 0;
          discountAmount = Number(ddadads['0']);
          if (startsWithKomplekt) {
            discountAmount2 = Number(ddadads2['0']);
          }
        } else if (fsdfsdfsdf >= 26 && fsdfsdfsdf <= 50) { /// Розница
          discountPercentage = 17;
          discountAmount = Number(ddadads['1']) * (1 - discountPercentage / 100);
          if (startsWithKomplekt) {
            discountAmount2 = Number(ddadads2['1']) * (1 - discountPercentage / 100);
          }
        } else if (fsdfsdfsdf >= 51 && fsdfsdfsdf <= 80) { /// Розница
          discountPercentage = 22;
          // console.log("\n Процент = 22" +  Number(ddadads['1'])+ "\n");
          discountAmount = Number(ddadads['1']) * (1 - discountPercentage / 100);
          if (startsWithKomplekt) {
            discountAmount2 = Number(ddadads2['1']) * (1 - discountPercentage / 100);
          }
        } else if (fsdfsdfsdf >= 81 && fsdfsdfsdf <= 150) { /// Розница
          discountPercentage = 26;
          discountAmount = Number(ddadads['1']) * (1 - discountPercentage / 100);
          if (startsWithKomplekt) {
            discountAmount2 = Number(ddadads2['1']) * (1 - discountPercentage / 100);
          }
        } else if (fsdfsdfsdf >= 151) { /// Розница
          discountPercentage = 28;
          discountAmount = Number(ddadads['1']) * (1 - discountPercentage / 100);
          if (startsWithKomplekt) {
            discountAmount2 = Number(ddadads2['1']) * (1 - discountPercentage / 100);
          }
        }
        // console.log("Скидка =" +   discountAmount2);
        var pdss = 0;
        if (startsWithKomplekt) {
          // console.log("\n Тип => "+result2+" \n"); 
          // console.log("\n Тип цена => "+ddadads2[0]+" \n"); 
          // console.log("\n Количество => "+value2222+" \n"); 
          // console.log("\n Суммарно комплектов => "+asdasdasd2+" \n"); 
          // console.log("\n Цена суммарная => "+discountAmount2+" \n"); 
          dsadasdas3.innerHTML = "А Комплект " + result2 + " - " + value2222 + " компл * " + Math.ceil(Number(discountAmount2)) + " руб/компл. = " + Math.ceil(Number(discountAmount2 * value2222)) + " руб.";
          pricess1 = Math.ceil(Number(discountAmount2 * value2222));
          // pdss = Math.ceil(Number(discountAmount2*value2222));
        }
        // console.log("\n Тип => "+result2+" \n"); 
        // console.log("\n Тип цена => "+ddadads2[0]+" \n"); 
        // console.log("\n Количество => "+value2222+" \n"); 
        // console.log("\n Суммарно комплектов => "+asdasdasd2+" \n"); 
        // let result2;
        // let ddadads2;
        // let value2222;
        // let asdasdasd2;
        // console.log("ДА");
        var ddasdasd = "Комплект " + result + "-" + value222 + "штук * " + Math.ceil(Number(discountAmount)) + "руб/шт = " + Math.ceil(Number(discountAmount)) * value222;
        dsadasdas.innerHTML = ddasdasd;
        dsadasdas2.innerHTML = "Цена фурнитуры на один козырёк: " + Math.ceil(Number(discountAmount) * Number(value222) + Number(pricess1) + Number(outputString)) + " рублей с НДС";
        dasasdasdasd += Math.ceil(Number(discountAmount) * Number(value222) + Number(pricess1) + Number(outputString));
        // console.log(ddasdasd);
      } else {
        if (startsWithKomplekt) {
          asdasdasd2 = count_as2(); /// Количесто для скидок всео 
          let text = dsadasdas3.innerHTML;
          let parts = text.split('-'); // Разделяем строку по дефисам
          if (parts.length > 2) {
            parts = parts.slice(0, 2); // Оставляем только первые две части
          }
          result2 = parts.join('-').replace(/Комплект\s*/g, '').trim(); // Объединяем обратно и убираем "Комплект"
          // let result2 = dsadasdas3.innerHTML.replace(/Комплект\s*|-.*/g, '').trim();   ////  РСК 50/304      
          let match2 = dsadasdas3.innerHTML.match(/- (.*?) компл/);
          value2222 = match2[1].trim(); /// Количество
          ddadads2 = arr.get(result2).split('-'); /// ['РСК 50/304', '8680-9900'],   [0] = 8680 [1] = 9900
          // console.log("\n Тип => "+result2+" \n"); 
          // console.log("\n Тип цена => "+ddadads2[0]+" \n"); 
          // console.log("\n Количество => "+value2222+" \n"); 
          // console.log("\n Суммарно комплектов => "+asdasdasd2+" \n"); 
        } else {
          asdasdasd2 = 0;
        }
        // console.log("\n Тип цена => "+ddadads2[0]+" \n"); 
        let pricess = 0;
        let fsdfsdfsdf2 = Number(asdasdasd) + Number(asdasdasd2);
        let discountAmount;
        if (fsdfsdfsdf2 <= 5) { /// Розница
          discountAmount = Number(ddadads['1']);
          if (startsWithKomplekt) {
            discountAmount2 = Number(ddadads2['1']);
          }
        } else if (fsdfsdfsdf2 >= 6 && fsdfsdfsdf2 <= 25) { /// Оптовая
          let discountPercentage = 0;
          discountAmount = Number(ddadads['0']);
          if (startsWithKomplekt) {
            discountAmount2 = Number(ddadads2['0']);
          }
        } else if (fsdfsdfsdf2 >= 26 && fsdfsdfsdf2 <= 50) { /// Розница
          let discountPercentage = 17;
          discountAmount = Number(ddadads['1']) * (1 - discountPercentage / 100);
          if (startsWithKomplekt) {
            discountAmount2 = Number(ddadads2['1']) * (1 - discountPercentage / 100);
          }
        } else if (fsdfsdfsdf2 >= 51 && fsdfsdfsdf2 <= 80) { /// Розница
          let discountPercentage = 22;
          // console.log("\n Процент = 22" +  Number(ddadads['1'])+ "\n");
          discountAmount = Number(ddadads['1']) * (1 - discountPercentage / 100);
          if (startsWithKomplekt) {
            discountAmount2 = Number(ddadads2['1']) * (1 - discountPercentage / 100);
          }
        } else if (fsdfsdfsdf2 >= 81 && fsdfsdfsdf2 <= 150) { /// Розница
          let discountPercentage = 26;
          discountAmount = Number(ddadads['1']) * (1 - discountPercentage / 100);
          if (startsWithKomplekt) {
            discountAmount2 = Number(ddadads2['1']) * (1 - discountPercentage / 100);
          }
        } else if (fsdfsdfsdf2 >= 151) { /// Розница
          let discountPercentage = 28;
          discountAmount = Number(ddadads['1']) * (1 - discountPercentage / 100);
          if (startsWithKomplekt) {
            discountAmount2 = Number(ddadads2['1']) * (1 - discountPercentage / 100);
          }
        }
        if (startsWithKomplekt) {
          // console.log("\n Тип => "+result2+" \n"); 
          // console.log("\n Тип цена => "+ddadads2[0]+" \n"); 
          // console.log("\n Количество => "+value2222+" \n"); 
          // console.log("\n Суммарно комплектов => "+asdasdasd2+" \n"); 
          // console.log("\n Цена суммарная => "+discountAmount2+" \n"); 
          dsadasdas3.innerHTML = "B Комплект " + result2 + " - " + value2222 + " компл * " + Math.ceil(Number(discountAmount2)) + " руб/компл. = " + Math.ceil(Number(discountAmount2 * value2222)) + " руб.";
          // pdss = Math.ceil(Number(discountAmount2*value2222));
          pricess = Math.ceil(Number(discountAmount2 * value2222));
        }
        // console.log("ДА");
        var ddasdasd = "Комплект " + result + "-" + value222 + "штук * " + Math.ceil(Number(discountAmount)) + "руб/шт = " + Math.ceil(Number(discountAmount)) * value222;
        dsadasdas.innerHTML = ddasdasd;
        dsadasdas2.innerHTML = "Цена фурнитуры на один козырёк: " + (Math.ceil(Number(discountAmount) * Number(value222) + Number(pricess) + Number(outputString))) + " рублей с НДС";
        // console.log(ddasdasd);
        // console.log("Нет");
        dasasdasdasd += (Math.ceil(Number(discountAmount) * Number(value222) + Number(pricess) + Number(outputString)));
      }
      var ddasdasd = "Комплект " + result + "-" + value222 + "штук *" + ddadads;
      // Извлекаем часть строки между знаком "-" и словом "штук"
      // console.log(value222); // "2"  /// Количество
      // arr.get(result)
    }
    document.querySelector(".total-cost-value").innerHTML = dasasdasdasd;
  } else {
    // console.error('Элемент с id "ordersContainer" не найден.');
  }
}

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
    setTimeout( () =>updateSliderValue(), 500);   
  });

  document.querySelectorAll('input[name="previousPurchase"]').forEach((radio) => {
    radio.addEventListener('change', () => {
      updateOrders();

      updateSliderValue(); /// Обновление данных

    });
  });

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
      standRigSystem: standRigSystemSelect.value,
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
    orderComponent.createNewOrder();
    orderManager.updateOrder(orderComponent.currentOrderIndex, results);
    orderComponent.displayOrderResults();
    updateOrders();
    updateButtonText();
  }





  function getHardwareType(snowRegion, width, steel, doubleKits) {
    const hardwareKey = `${snowRegion}-${width}`;
    const doubleKitsKey = doubleKits === "yes" ? "_double" : "";
    const steelTypeKey = `aisi${steel.split("aisi")[1]}${doubleKitsKey}`;
    return hardwareMapping[hardwareKey]?.[steelTypeKey] || "По запросу";
  }





  function calculateAndDisplayResults(inputs, snowRegion) {
    const hardwareType = getHardwareType(snowRegion, inputs.width, inputs.steel, "no");
    const doubleHardwareType = getHardwareType(snowRegion, inputs.width, inputs.steel, "yes");
    const priceInfo = hardwarePrices[hardwareType] || { wholesale: 0, retail: 0 };
    const doublePriceInfo = hardwarePrices[doubleHardwareType] || { wholesale: 0, retail: 0 };
  
    const { Z, L, РСК, РСКД } = calculateHardware(inputs.length, inputs.glassLimit, inputs.doubleKits);
    const bracketCount = РСК * inputs.count;
    const doubleBracketCount = РСКД * inputs.count;
    const anchorInfo = calculateTotalAnchorCost(hardwareType, bracketCount, inputs.facade, inputs.standRigSystem, hardwareAnchors, anchorPrices, anchorNames, inputs.ventFacadeNeedAnchors);
  
    let basePrice = priceInfo.retail;
    let doubleBasePrice = doublePriceInfo.retail;
  
    // Устанавливаем оптовые цены, если покупали ранее или количество >= 6
    if (inputs.previousPurchase === "да" || (bracketCount + doubleBracketCount) >= 6) {
      basePrice = priceInfo.wholesale;
      doubleBasePrice = doublePriceInfo.wholesale;
    }
  
    // Применяем розничные цены и скидки при количестве >= 26
    if ((bracketCount + doubleBracketCount) >= 26) {
      basePrice = priceInfo.retail;
      doubleBasePrice = doublePriceInfo.retail;
      if ((bracketCount + doubleBracketCount) >= 26 && (bracketCount + doubleBracketCount) <= 50) {
        basePrice *= 0.83;
        doubleBasePrice *= 0.83;
      } else if ((bracketCount + doubleBracketCount) >= 51 && (bracketCount + doubleBracketCount) <= 80) {
        basePrice *= 0.78;
        doubleBasePrice *= 0.78;
      } else if ((bracketCount + doubleBracketCount) >= 81 && (bracketCount + doubleBracketCount) <= 150) {
        basePrice *= 0.74;
        doubleBasePrice *= 0.74;
      } else if ((bracketCount + doubleBracketCount) > 150) {
        basePrice *= 0.72;
        doubleBasePrice *= 0.72;
      }
    }
  
    let hardwareCost = bracketCount * basePrice;
    const doubleHardwareCost = doubleBracketCount * doubleBasePrice;
    const totalHardwareCost = hardwareCost + doubleHardwareCost;
  
    const totalCostBeforeDiscounts = totalHardwareCost + anchorInfo.totalAnchorCost;
    const totalCost = totalCostBeforeDiscounts; // Без дополнительных скидок
  
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
      doubleHardwareCost,
      totalHardwareCost,
      totalCostBeforeDiscounts,
      totalCost,
      doubleKitsText: inputs.doubleKits === "yes" ? "С использованием сдвоенных комплектов" : "Без использования сдвоенных комплектов",
      inputs,
      anchorInfo,
      snowRegion,
      Z,
      L: Math.ceil(L),
      РСК,
      РСКД,
      randomImage
    };
  
    return resultData;
  }
  
  
  function updateOrders() {
    const orders = orderManager.getOrders();
    displayOrders(orders);
    displayTotalCostWithDiscount(orders);
  }
  
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
              <p class="result-description">Комплект ${order.hardwareType} - ${order.bracketCount} компл. х ${order.basePrice.toFixed(2)} руб/шт = ${(order.bracketCount * order.basePrice).toFixed(2)} руб.</p>
              ` : ''}
              ${order.doubleBracketCount > 0 ? `
              <p class="result-description">Комплект ${order.doubleHardwareType} - ${order.doubleBracketCount} компл. х ${order.doubleBasePrice.toFixed(2)} руб/компл. = ${(order.doubleBracketCount * order.doubleBasePrice).toFixed(2)} руб.</p>
              ` : ''}
              ${order.anchorInfo.totalAnchorCount > 0 && order.anchorInfo.anchorName !== "не используется" ? `
              <p class="result-description">${order.anchorInfo.anchorName} - ${order.anchorInfo.totalAnchorCount} шт. х ${order.anchorInfo.totalAnchorCost.toFixed(2)} руб.</p>
              ` : ''}
              <p class="result-description">Цена фурнитуры на один козырёк: ${order.totalCost.toFixed(2)} рублей с НДС</p>
            </div>
            <div class="image-container">
              <img id="orderImage${index}" src="/images/${order.randomImage}" alt="Фурнитура">
            </div>
          </div>
        </div>
      `;
      ordersContainer.appendChild(orderElement);
  
      const deleteButton = orderElement.querySelector(".delete-button");
      deleteButton.addEventListener("click", () => {
        removeOrder(index);
        setTimeout(() => updateSliderValue(), 500);
      });
    });
  
    displayTotalCostWithDiscount(orders);
  }
  

  function displayTotalCostWithDiscount(orders) {
    const totalCost = orders.reduce((acc, order) => acc + order.totalCost, 0);
    const totalBracketCount = orders.reduce((acc, order) => acc + order.bracketCount, 0);
    const discountedTotal = calculateTotalDiscount(totalCost, totalBracketCount);
  
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
  

  function removeOrder(index) {
    const orderElement = document.querySelector(`.order-item[data-index="${index}"]`);
    if (orderElement) {
      orderElement.classList.add("hide");
      setTimeout(() => {
        orderManager.deleteOrder(index);
        updateOrders();
        updateButtonText();
      }, 500);
    }
  }

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