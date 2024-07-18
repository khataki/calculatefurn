// components/orderComponent.js

import { images } from './dataBase.js'; // Ensure images are imported

export class OrderComponent {
  constructor(containerId, orderManager) {
    this.container = document.getElementById(containerId);
    this.orderManager = orderManager;
    this.currentOrderIndex = null;

    this.container.addEventListener('click', (event) => {
      if (event.target.classList.contains('delete-order')) {
        this.handleDelete(event);
      }
    });
  }

  createNewOrder() {
    const orderIndex = this.orderManager.getOrders().length;
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];

    this.orderManager.addOrder({ randomImage });
    this.addOrder(orderIndex);
    this.currentOrderIndex = orderIndex;
  }

  addOrder(orderIndex) {
    const orderDiv = document.createElement("div");
    orderDiv.className = "order";
    orderDiv.dataset.index = orderIndex;
    orderDiv.innerHTML = `
      <h2>Комплект №${orderIndex + 1}</h2>
      <button class="delete-order" data-index="${orderIndex}">Удалить</button>
    `;
    this.container.appendChild(orderDiv);
  }

  handleDelete(event) {
    const index = parseInt(event.target.dataset.index, 10);
    this.orderManager.deleteOrder(index);
    this.removeOrderFromDOM(index);
    if (this.orderManager.getOrders().length > 0) {
      this.currentOrderIndex = this.orderManager.getOrders().length - 1;
    } else {
      this.currentOrderIndex = null;
    }
    this.displayOrderResults();
  }

  removeOrderFromDOM(index) {
    const orderDiv = this.container.querySelector(`[data-index='${index}']`);
    if (orderDiv) {
      this.container.removeChild(orderDiv);
      this.updateOrderIndices();
    }
  }

  updateOrderIndices() {
    const orders = this.orderManager.getOrders();
    const orderElements = this.container.querySelectorAll('.order, .order-summary');

    orderElements.forEach((orderDiv, index) => {
      if (orderDiv) {
        const order = orders[index];
        if (order) {
          const header = orderDiv.querySelector("h2");
          const deleteButton = orderDiv.querySelector(".delete-order");

          if (header) {
            header.textContent = `Заказ №${index + 1}`;
          }

          if (deleteButton) {
            deleteButton.dataset.index = index;
          }

          orderDiv.dataset.index = index;
        }
      }
    });
  }

  displayOrderResults() {
    const orders = this.orderManager.getOrders();
    let totalCost = 0;

    this.container.innerHTML = '';
    orders.forEach((order, index) => {
      totalCost += order.totalCost + order.anchorInfo.totalAnchorCost;
      const orderDiv = document.createElement("div");
      orderDiv.className = "order-summary";
      orderDiv.dataset.index = index;
      orderDiv.innerHTML = `
        <h3>Комплект №${index + 1}</h3>
        <p class="result-description">Общая стоимость фурнитуры: ${order.totalCost + order.anchorInfo.totalAnchorCost} рублей с НДС.</p>
        <p class="result-description">Размеры стёкол козырька: ${order.inputs.glassLimit}x${order.inputs.length} мм, количество: ${order.glassCount} штук.</p>
        <p class="result-description">Снеговой район: ${order.snowRegion}</p>
        <p class="result-description">Количество стёкол: ${order.Z}</p>
        <p class="result-description">Длина стекла: ${order.L} мм</p>
        <p class="result-description">РСК: ${order.РСК}, РСКД: ${order.РСКД}</p>
        <button class="delete-order" data-index="${index}">Удалить</button>
      `;
      this.container.appendChild(orderDiv);
    });

    const totalCostDiv = document.createElement("div");
    totalCostDiv.className = "total-cost";
    totalCostDiv.innerHTML = `
      <h2>Общая стоимость: ${totalCost} руб.</h2>
    `;
    this.container.appendChild(totalCostDiv);
  }
}
