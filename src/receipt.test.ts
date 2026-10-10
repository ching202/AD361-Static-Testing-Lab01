// Tests for the corrected grocery receipt program.
// Reset the module before each test so changes to the grocery list do not leak.
import type * as ReceiptModule from "./fixed_receipt";

let receipt: typeof ReceiptModule;

beforeEach(() => {
  jest.resetModules();
  receipt = require("./fixed_receipt") as typeof ReceiptModule;
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe("Receipt Tests", () => {
  test("calculates the original subtotal correctly", () => {
    expect(receipt.total()).toBeCloseTo(47.49, 2);
  });

  test("adds an item to the grocery list", () => {
    receipt.addItem("milk", 4.5);
    expect(receipt.total()).toBeCloseTo(51.99, 2);
  });

  test("allows a free item with a zero price", () => {
    receipt.addItem("coupon item", 0);
    expect(receipt.total()).toBeCloseTo(47.49, 2);
  });

  test("rejects an item with a negative price", () => {
    expect(() => receipt.addItem("bad item", -2)).toThrow();
    expect(receipt.total()).toBeCloseTo(47.49, 2);
  });

  test("rejects an item with an empty name", () => {
    expect(() => receipt.addItem("   ", 2)).toThrow();
  });

  test("deletes the requested item rather than the last item", () => {
    const remaining = receipt.deleteItem("sandwich");
    expect(remaining.some((item) => item.name === "sandwich")).toBe(false);
    expect(remaining.some((item) => item.name === "avocado oil")).toBe(true);
    expect(receipt.total()).toBeCloseTo(38.74, 2);
  });

  test("does not change the list when deleting a missing item", () => {
    expect(receipt.deleteItem("not in list")).toHaveLength(4);
    expect(receipt.total()).toBeCloseTo(47.49, 2);
  });

  test("calculates the total including six percent tax", () => {
    expect(receipt.tax(0.06)).toBeCloseTo(50.3394, 4);
  });

  test("handles zero tax", () => {
    expect(receipt.tax(0)).toBeCloseTo(47.49, 2);
  });

  test("rejects a negative tax rate", () => {
    expect(() => receipt.tax(-0.1)).toThrow();
  });

  test("prints item names, subtotal, tax, and total", () => {
    const log = jest.spyOn(console, "log").mockImplementation(() => {});
    receipt.printReceipt(0.06);
    const lines = log.mock.calls.map((args) => String(args[0]));
    expect(lines).toContain("paper towels : $21.99");
    expect(lines).toContain("Subtotal: $47.49");
    expect(lines).toContain("Tax: $2.85");
    expect(lines).toContain("Total: $50.34");
  });
});
