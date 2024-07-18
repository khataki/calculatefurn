// components/orderManager.js
export class OrderManager {
  constructor() {
    this.orders = [];
  }

  getOrders() {
    return this.orders;
  }

  addOrder(order) {
    this.orders.push(order);
  }

  deleteOrder(index) {
    this.orders.splice(index, 1);
  }

  updateOrder(index, order) {
    this.orders[index] = order;
  }
}
