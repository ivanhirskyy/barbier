export const convertPrice = (price: number) => {
  // expected: 10 => 10.00 €
  // expected: 10.5 => 10.50 €
  // expected 1000 => 1,000.00 €
  // expected: 0 => Sob consulta
  // in Euro

  if (price === 0) {
    return 'Sob consulta';
  }
  return price.toLocaleString('pt-PT', { style: 'currency', currency: 'EUR' });
};
