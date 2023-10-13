/**
 * Calculates the total amount based on an array of items with quantity and price.
 * @param {Object[]} data - An array of objects, where each object represents an item with quantity and price.
 * @param {number} data[].quantity - The quantity of the item.
 * @param {number|string} data[].price - The price of the item, which can be a number or a string.
 * @returns {number} - The total calculated amount.
 */
function TotalAmount(
  data: {
    quantity: number;
    price: number | string;
  }[]
): number {
  return data.reduce((ac: number, el) => {
    return (ac = ac + el.quantity * Number(el.price));
  }, 0);
}

export default TotalAmount;
