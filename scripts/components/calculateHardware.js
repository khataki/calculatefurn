export function calculateHardware(X, Y, doubleKits) {
  console.log(`Calculating hardware with X=${X}, Y=${Y}, doubleKits=${doubleKits}`);
  
  let Z, L, РСК, РСКД;

  if (X <= Y) {
    Z = 1;
    L = X;

    if (L <= 1800) {
      РСК = 2;
      РСКД = 0;
    } else if (1800 <= L && L <= 3000) {
      РСК = 3;
      РСКД = 0;
    } else if (3000 <= L && L <= 3200) {
      РСК = 4;
      РСКД = 0;
    }
  } else {
    Z = Math.ceil(X / Y);
    L = X / Z;

    if (doubleKits === "no") {
      if (L <= 1800) {
        РСК = 2 * Z;
        РСКД = 0;
      } else if (1800 <= L && L <= 3000) {
        РСК = 3 * Z;
        РСКД = 0;
      } else if (3000 <= L && L <= 3200) {
        РСК = 4 * Z;
        РСКД = 0;
      }
    } else if (doubleKits === "yes") {
      if (L <= 1700) {
        РСК = Z;
        РСКД = Z - 1;
      } else if (1700 <= L && L <= 2900) {
        РСК = Z + 2;
        РСКД = Z - 1;
      } else if (2900 <= L && L <= 3200) {
        РСК = 6 + (Z - 2) * 2;
        РСКД = Z - 1;
      }
    }
  }

  console.log({ Z, L, РСК, РСКД });
  return { Z, L, РСК, РСКД };
}
