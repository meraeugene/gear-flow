export const calculateTotal = (
  pricePerDay: number,
  days: number,
  deliveryFee = 0,
) => {
  return pricePerDay * days + deliveryFee;
};
