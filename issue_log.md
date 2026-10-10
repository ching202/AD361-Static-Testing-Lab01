# Static Testing Issue Log

**Project:** AD361 — StarterLab01  
**Original file reviewed:** `src/receipt.ts`  
**Corrected file:** `src/fixed_receipt.ts`  
**Tools:** Manual review, TypeScript, ESLint, and Jest  
**Issues documented:** 12

## Defect Log

| ID | Location | Issue | Explanation | Suggested Fix | Status |
|---|---|---|---|---|---|
| 01 | Line 12 | Empty item in grocery list | The extra comma leaves an empty slot, so the list contains an invalid entry. | Remove the extra comma so every entry is a valid item. | Fixed |
| 02 | Line 17 | Invalid object syntax | The new item uses `=` instead of `:` for object properties. TypeScript cannot parse it. | Use valid object properties, such as `{ name, price }`. | Fixed |
| 03 | Lines 16–18 | No input validation when adding items | Empty names and negative or nonnumeric prices could be added to the list. | Reject empty names and invalid prices before adding the item. | Fixed |
| 04 | Line 22 | Searches for the wrong value | `indexOf("name")` searches for a string, not an item whose name matches the argument. The result is also unused. | Use `findIndex()` to locate the item with the requested name. | Fixed |
| 05 | Line 23 | Deletes the last item instead of the requested item | `pop()` always removes the final list entry, even when another item was requested. | Use `splice()` at the matching index; leave the list alone if there is no match. | Fixed |
| 06 | Line 28 | Invalid loop | `for (const i of 3)` tries to loop over a number, which is not iterable. | Iterate over the actual grocery items. | Fixed |
| 07 | Lines 29–31 | Subtotal uses the function name as a variable | The code tries to assign a numeric result to `total` instead of accumulating item prices in a number. | Sum item prices into a numeric subtotal and return it. | Fixed |
| 08 | Line 35 | Tax is calculated incorrectly | Adding the tax rate directly to the subtotal does not calculate a percentage. | Multiply the subtotal by `1 + taxRate`, with rates expressed as decimals. | Fixed |
| 09 | Lines 34–36 | Tax rate is not validated | A negative or invalid tax rate could produce an incorrect total. | Check that the tax rate is a finite, nonnegative number. | Fixed |
| 10 | Lines 42–44 | Receipt item output is incorrect | The loop variable is an item object, not an array index, and single quotes print the placeholders literally. | Print `item.name` and `item.price` using proper formatting. | Fixed |
| 11 | Line 47 | Subtotal prints a function instead of its result | `String(total)` converts the function itself to text rather than calling it. | Call `total()` and format the result as money. | Fixed |
| 12 | Lines 48–49 | Broken receipt strings and incorrect total output | Mismatched quotes cause parsing errors, and the total line passes a string to `tax()`. | Correct the strings, use a numeric tax rate, and print calculated tax and total amounts. | Fixed |

## Root Cause, Error, Defect, and Failure Examples

- **Root cause:** The receipt code mixes up item objects, array indexes, and function names. This suggests confusion about how these values should be used.
- **Error:** Writing `=` instead of `:` when creating the new item on line 17 is a coding mistake.
- **Defect:** Using `ITEMS.pop()` in `deleteItem()` means the code always removes the last item instead of the requested one.
- **Failure:** The original Jest test suite could not run because TypeScript compilation failed. If the delete function ran as written, it would also remove the wrong grocery item.

## Testing and Static Analysis Results

### Original Code

- **Jest:** Failed before tests could execute because the original file contained TypeScript compilation and syntax errors. The terminal initially reported 17 diagnostics; several came from the same underlying defects.
- **ESLint:** Reported `17:27  Parsing error: ':' expected`. ESLint could not continue analyzing the file until that syntax problem was corrected.
- **Evidence:** `initial_test_results.txt` and `eslint_results.txt`.

### Corrected Code

- **TypeScript:** `npx tsc --noEmit src/fixed_receipt.ts` completed without reported errors.
- **ESLint:** `npx eslint src/fixed_receipt.ts` completed without reported errors.
- **Jest:** All **11 tests passed**, including adding and deleting items, subtotal, tax, invalid inputs, zero values, and receipt printing.
- **Evidence:** `final_test_results.txt` and screenshots in `screenshots/`.

## Conclusion

The manual review found syntax errors, incorrect calculations, and problems with adding, deleting, and printing items. ESLint caught the first parsing error, while Jest helped confirm the corrected behavior. All 12 documented issues were addressed in `fixed_receipt.ts`, and the final 11 automated tests passed.
