# Static Testing Issue Log

**Project:** StarterLab01  
**File Reviewed:** `src/receipt.ts`  
**Testing Tool:** Jest / TypeScript

## Defects Found

| Line | Issue | Suggested Fix |
|---|---|---|
| 17 | Object properties use `=` instead of `:` | Use colons when creating the object. |
| 22 | `indexOf("name")` searches for a string instead of an item. | Find the item by its name. |
| 28 | The loop tries to iterate over the number `3`. | Loop through the grocery items. |
| 29 | `total` is treated as both a function and a variable. | Use a separate subtotal variable. |
| 35 | Tax is added directly instead of calculated as a percentage. | Multiply the subtotal by the tax rate. |
| 49 | The receipt output contains broken quotation marks. | Correct the string formatting. |

## Testing Results

**Initial Test:** Failed

Jest found 17 TypeScript compilation errors in the original `receipt.ts` file. These errors prevented the tests from running.

## Next Steps

- Run ESLint to check for additional issues.
- Fix the defects in `fixed_receipt.ts`.
- Run the tests again to verify the fixes.

### ESLint Results

ESLint found a parsing error on line 17 because the object
properties use `=` instead of `:`.

The syntax error prevented ESLint from checking the rest
of the file.

## Final Testing Results

- Initial testing: Failed due to TypeScript errors.
- Initial ESLint: Parsing error on line 17.
- Corrected file: fixed_receipt.ts
- Final Jest results: 11 tests passed.
- Final ESLint: No errors reported.
- Status: All documented defects fixed.

## Conclusion

The original receipt program had several issues
that prevented it from working correctly.
After reviewing the code and fixing the defects,
all 11 automated tests passed successfully.