export function calculateTotalDiscount(totalCost, totalBracketCount) {
  let discount = 0;
  if (totalBracketCount >= 26 && totalBracketCount <= 50) discount = 0.17;
  else if (totalBracketCount >= 51 && totalBracketCount <= 80) discount = 0.22;
  else if (totalBracketCount >= 81 && totalBracketCount <= 150) discount = 0.26;
  else if (totalBracketCount > 150) discount = 0.28;

  console.log(`Total cost: ${totalCost}, Total bracket count: ${totalBracketCount}, Discount: ${discount * 100}%`);
  return totalCost * (1 - discount);
}

export function applyBulkPrices(orders, hardwarePrices) {
  const totalBracketCount = orders.reduce((acc, order) => acc + order.bracketCount, 0);
  const isBulk = totalBracketCount >= 6;

  orders.forEach(order => {
    const priceInfo = hardwarePrices[order.hardwareType] || { wholesale: 0, retail: 0 };
    if (isBulk) {
      order.basePrice = priceInfo.wholesale;
      console.log(`Applied wholesale price for ${order.hardwareType}: ${order.basePrice}`);
    } else {
      order.basePrice = priceInfo.retail;
      console.log(`Applied retail price for ${order.hardwareType}: ${order.basePrice}`);
    }
    order.totalCost = order.bracketCount * order.basePrice;

    const doublePriceInfo = hardwarePrices[order.doubleHardwareType] || { wholesale: 0, retail: 0 };
    if (isBulk) {
      order.doubleBasePrice = doublePriceInfo.wholesale;
    } else {
      order.doubleBasePrice = doublePriceInfo.retail;
    }
    order.doubleCost = order.doubleBracketCount * order.doubleBasePrice;
  });

  console.log("Applied bulk prices:", orders);
}

export function applyPurchaseHistoryDiscount(orders, hardwarePrices, isPreviousCustomer) {
  orders.forEach(order => {
    const priceInfo = hardwarePrices[order.hardwareType] || { wholesale: 0, retail: 0 };
    if (isPreviousCustomer) {
      order.basePrice = priceInfo.wholesale;
      console.log(`Applied wholesale price for previous customer for ${order.hardwareType}: ${order.basePrice}`);
    } else {
      order.basePrice = priceInfo.retail;
      console.log(`Applied retail price for ${order.hardwareType}: ${order.basePrice}`);
    }
    order.totalCost = order.bracketCount * order.basePrice;

    const doublePriceInfo = hardwarePrices[order.doubleHardwareType] || { wholesale: 0, retail: 0 };
    if (isPreviousCustomer) {
      order.doubleBasePrice = doublePriceInfo.wholesale;
    } else {
      order.doubleBaseBasePrice = doublePriceInfo.retail;
    }
    order.doubleCost = order.doubleBracketCount * order.doubleBasePrice;
  });

  console.log("Applied purchase history discount:", orders);
}
