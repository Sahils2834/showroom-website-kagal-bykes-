export function calculateEMI(price, down, interest, months) {

  const loan = price - down;

  const r = interest / 12 / 100;

  const emi =
    loan *
    r *
    Math.pow(1 + r, months) /
    (Math.pow(1 + r, months) - 1);

  return Math.round(emi);
}