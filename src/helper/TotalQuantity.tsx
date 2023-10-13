/**
 * Calculates the total quantity based on an array of items with quantity.
 * @param {Object[]} data - An array of objects, where each object represents an item with quantity.
 * @param {number} data[].quantity - The quantity of the item.
 * @returns {number} - The total calculated quantity.
 */
function TotalQuantity(
  data: {
    quantity: number;
  }[]
): number {
  return data.reduce((ac: number, el) => {
    return (ac = ac + el.quantity);
  }, 0);
}

export default TotalQuantity;
