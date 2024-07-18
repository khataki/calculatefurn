// components/anchorCost.js

export function calculateTotalAnchorCost(hardwareType, bracketCount, facade, standRigSystem, hardwareAnchors, anchorPrices, anchorNames, ventFacadeNeedAnchors) {
  let anchorCountPerUnit = hardwareAnchors[hardwareType] || 0;
  let anchorPrice = 0;
  let anchorName = "не используется";

  if (facade === "стоечно-ригельная система") {
    switch (standRigSystem) {
      case "through":
        anchorCountPerUnit = 0;
        anchorPrice = 0;
        anchorName = "не используется";
        break;
      case "aisi304":
        if (hardwareType.startsWith("РСК50") || hardwareType.startsWith("РСК60")) {
          anchorName = anchorNames[facade]["КДС155/304"];
          anchorPrice = anchorPrices[facade]["КДС155/304"];
        } else if (hardwareType.startsWith("РСКУ14") || hardwareType.startsWith("РСКУ16")) {
          anchorName = anchorNames[facade]["КДС260/304"];
          anchorPrice = anchorPrices[facade]["КДС260/304"];
        }
        anchorCountPerUnit = 2;
        break;
      case "steelSt3":
        if (hardwareType.startsWith("РСК50") || hardwareType.startsWith("РСК60")) {
          anchorName = anchorNames[facade]["КДС155/ст3"];
          anchorPrice = anchorPrices[facade]["КДС155/ст3"];
        } else if (hardwareType.startsWith("РСКУ14") || hardwareType.startsWith("РСКУ16")) {
          anchorName = anchorNames[facade]["КДС260/ст3"];
          anchorPrice = anchorPrices[facade]["КДС260/ст3"];
        }
        anchorCountPerUnit = 2;
        break;
      default:
        anchorPrice = 0;
        anchorName = "не используется";
    }
  } else if (ventFacadeNeedAnchors === "no" && facade === "вентилируемый фасад") {
    anchorCountPerUnit = 0;
    anchorPrice = 0;
    anchorName = "не используется";
  } else {
    anchorPrice = anchorPrices[facade] || 0;
    anchorName = anchorNames[facade] || "не используется";
  }

  const totalAnchorCount = anchorCountPerUnit * bracketCount;
  const totalAnchorCost = totalAnchorCount * anchorPrice;

  return { totalAnchorCount, totalAnchorCost, anchorName };
}
