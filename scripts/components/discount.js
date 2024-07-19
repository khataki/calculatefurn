export function calculateTotalDiscount(totalCost, totalBracketCount) {
  let discount = 0;
  if (totalBracketCount >= 26 && totalBracketCount <= 50) discount = 0.17;
  else
 if (totalBracketCount >= 51 && totalBracketCount <= 80) discount = 0.22;
  else
 if (totalBracketCount >= 81 && totalBracketCount <= 150) discount = 0.26;
  else
 if (totalBracketCount > 150) discount = 0.28;

  return totalCost * (1 - discount);
}