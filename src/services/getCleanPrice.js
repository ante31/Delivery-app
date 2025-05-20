const getCleanPrice = (item) => {
  let extrasTotal = 0;

  if (item.selectedExtras && typeof item.selectedExtras === 'object') {
    extrasTotal = Object.values(item.selectedExtras).reduce((sum, price) => sum + price, 0);
  }

  return item.price - extrasTotal;
};

export default getCleanPrice;
