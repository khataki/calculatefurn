export function calculateTotalAnchorCost(hardwareType, bracketCount, facade, standRigSystem, hardwareAnchors, anchorPrices, anchorNames, ventFacadeNeedAnchors) {
  let anchorCountPerUnit = hardwareAnchors[hardwareType] || 0;
  let anchorPrice = 0;
  let anchorName = "не используется";

  console.log("Initial values:", {
    hardwareType,
    bracketCount,
    facade,
    standRigSystem,
    ventFacadeNeedAnchors
  });

  if (facade === "стоечно-ригельная система") {
    console.log("Facade is стоечно-ригельная система");
    switch (standRigSystem) {
      case "through":
        anchorCountPerUnit = 0;
        anchorPrice = 0;
        anchorName = "не используется";
        console.log("Case through executed");
        break;
      case "aisi304":
        console.log("Case aisi304 executed");
        if (hardwareType.startsWith("РСК 50") || hardwareType.startsWith("РСК 60")) {
          console.log("Matching РСК 50 or РСК 60");
          anchorName = anchorNames[facade]?.aisi304?.["КДС155/304"];
          anchorPrice = anchorPrices[facade]?.aisi304?.["КДС155/304"];
          console.log("aisi304 and РСК 50 or РСК 60", { anchorName, anchorPrice });
        } else if (hardwareType.startsWith("РСКУ 14") || hardwareType.startsWith("РСКУ 16")) {
          console.log("Matching РСКУ 14 or РСКУ 16");
          anchorName = anchorNames[facade]?.aisi304?.["КДС260/304"];
          anchorPrice = anchorPrices[facade]?.aisi304?.["КДС260/304"];
          console.log("aisi304 and РСКУ 14 or РСКУ 16", { anchorName, anchorPrice });
        }
        anchorCountPerUnit = 2;
        break;
      case "steelSt3":
        console.log("Case steelSt3 executed");
        if (hardwareType.startsWith("РСК 50") || hardwareType.startsWith("РСК 60")) {
          console.log("Matching РСК 50 or РСК 60");
          anchorName = anchorNames[facade]?.steelSt3?.["КДС155/ст3"];
          anchorPrice = anchorPrices[facade]?.steelSt3?.["КДС155/ст3"];
          console.log("steelSt3 and РСК 50 or РСК 60", { anchorName, anchorPrice });
        } else if (hardwareType.startsWith("РСКУ 14") || hardwareType.startsWith("РСКУ 16")) {
          console.log("Matching РСКУ 14 or РСКУ 16");
          anchorName = anchorNames[facade]?.steelSt3?.["КДС260/ст3"];
          anchorPrice = anchorPrices[facade]?.steelSt3?.["КДС260/ст3"];
          console.log("steelSt3 and РСКУ 14 or РСКУ 16", { anchorName, anchorPrice });
        }
        anchorCountPerUnit = 2;
        break;
      default:
        anchorCountPerUnit = 0;
        anchorPrice = 0;
        anchorName = "не используется";
        console.log("Default case executed");
    }
  } else if (ventFacadeNeedAnchors === "no" && facade === "вентилируемый фасад") {
    console.log("Facade is вентилируемый фасад and no anchors needed");
    anchorCountPerUnit = 0;
    anchorPrice = 0;
    anchorName = "не используется";
  } else {
    console.log("Other facade type");
    console.log(`Checking anchorPrices for ${facade}:`, anchorPrices[facade]);
    console.log(`Checking anchorNames for ${facade}:`, anchorNames[facade]);
    anchorPrice = anchorPrices[facade] || 0;
    anchorName = anchorNames[facade] || "не используется";
    console.log("Other facade case:", { anchorName, anchorPrice });
  }

  const totalAnchorCount = anchorCountPerUnit * bracketCount;
  const totalAnchorCost = totalAnchorCount * anchorPrice;

  console.log("Final values:", {
    totalAnchorCount,
    totalAnchorCost,
    anchorName,
    anchorPrice,
    anchorCountPerUnit
  });

  return { totalAnchorCount, totalAnchorCost, anchorName };
}

// Пример вызова функции для отладки
const testHardwareType = "РСК 50/304";
const testBracketCount = 2;
const testFacade = "стоечно-ригельная система";
const testStandRigSystem = "aisi304";
const testVentFacadeNeedAnchors = "yes";

const hardwareAnchors = {
  "РСК 50/304": 2,
  "РСК 50/316": 2,
  "РСК-Д 50/304": 3,
  "РСК-Д 50/316": 3,
  "РСК 60/304": 2,
  "РСК 60/316": 2,
  "РСК-Д 60/304": 3,
  "РСК-Д 60/316": 3,
  "РСКУ 60/304": 2,
  "РСКУ 60/316": 2,
  "РСКУ-Д 60/304": 3,
  "РСКУ-Д 60/316": 3,
  "РСК 14/304": 2,
  "РСК 14/316": 2,
  "РСК-Д 14/304": 3,
  "РСК-Д 14/316": 3,
  "РСКУ 14/304": 2,
  "РСКУ 14/316": 2,
  "РСКУ-Д 14/304": 3,
  "РСКУ-Д 14/316": 3,
  "РСК 16/304": 2,
  "РСК 16/316": 2,
  "РСК-Д 16/304": 3,
  "РСК-Д 16/316": 3,
  "РСКУ 16/304": 2,
  "РСКУ 16/316": 2,
  "РСКУ-Д 16/304": 3,
  "РСКУ-Д 16/316": 3,
};

const anchorPrices = {
  "несущая стена без утепления": 0,
  "несущая стена с утеплением толщиной до 50 мм": 530,
  "несущая стена с утеплением толщиной свыше 50 мм": 1050,
  "вентилируемый фасад": 1050,
  "стоечно-ригельная система": {
    "aisi304": {
      "КДС155/304": 2500,
      "КДС260/304": 3600,
    },
    "steelSt3": {
      "КДС155/ст3": 2500,
      "КДС260/ст3": 1700,
    }
  },
  "сендвич панель": 1050,
};

const anchorNames = {
  "несущая стена без утепления": "не используется",
  "несущая стена с утеплением толщиной до 50 мм": "Дистанционная (закладная) втулка",
  "несущая стена с утеплением толщиной свыше 50 мм": "Дистанционный (закладной) кронштейн",
  "вентилируемый фасад": "Дистанционный (закладной) кронштейн",
  "стоечно-ригельная система": {
    "aisi304": {
      "КДС155/304": "Кондуктор в стойку aisi 304 50/60",
      "КДС260/304": "Кондуктор в стойку aisi 304 14, 16",
    },
    "steelSt3": {
      "КДС155/ст3": "Кондуктор в стойку сталь Ст3 50/60",
      "КДС260/ст3": "Кондуктор в стойку сталь Ст3 14, 16",
    }
  },
  "сендвич панель": "Дистанционная втулка",
};

const result = calculateTotalAnchorCost(
  testHardwareType,
  testBracketCount,
  testFacade,
  testStandRigSystem,
  hardwareAnchors,
  anchorPrices,
  anchorNames,
  testVentFacadeNeedAnchors
);

console.log("Result:", result);
