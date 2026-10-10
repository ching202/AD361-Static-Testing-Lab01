// Corrected grocery receipt implementation.
// Tax rates are decimal values (for example, 0.06 means 6%).

type Item = { name: string; price: number };

const ITEMS: Item[] = [
  { name: "paper towels", price: 21.99 },
  { name: "sandwich", price: 8.75 },
  { name: "eggs", price: 6.75 },
  { name: "avocado oil", price: 10.0 },
];

export function addItem(name: string, price: number): void {
  if (!name.trim() || !Number.isFinite(price) || price < 0) {
    throw new Error("Item name must not be empty and price must be a nonnegative number.");
  }
  ITEMS.push({ name, price });
}

export function deleteItem(name: string): Item[] {
  const idx = ITEMS.findIndex((item) => item.name === name);
  if (idx !== -1) {
    ITEMS.splice(idx, 1);
  }
  return ITEMS;
}

export function total(): number {
  return ITEMS.reduce((subtotal, item) => subtotal + item.price, 0);
}

export function tax(taxRate: number): number {
  if (!Number.isFinite(taxRate) || taxRate < 0) {
    throw new Error("Tax rate must be a nonnegative number.");
  }
  return total() * (1 + taxRate);
}

export function printReceipt(taxRate: number): void {
  const subtotal = total();
  const grandTotal = tax(taxRate);
  console.log("************************");
  for (const item of ITEMS) {
    console.log(`${item.name} : $${item.price.toFixed(2)}`);
  }
  console.log("************************");
  console.log(`Subtotal: $${subtotal.toFixed(2)}`);
  console.log(`Tax: $${(grandTotal - subtotal).toFixed(2)}`);
  console.log(`Total: $${grandTotal.toFixed(2)}`);
}
