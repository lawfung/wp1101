# wp1101

This calculator is based on an old android calculator.

## Explanations

1. The extra 3 operators are "+/-", "%", "abs".
2. All numbers are round to 1e-100
3. All numbers are only reserved 12 significant digits
4. When some results is greater then 1e100 or less than -1e100, overflow occurs.
5. Input length cannot exceed 18

## Details

1. **MC** will clean memory and **C** will clean everything **except for memory**. These are the only two buttons which will take effect when an error occur.
2. **←** can only delete input numbers which are just typed (no effect on the result).
3. If you type a long expression such as "1+2\*3=", when \* is typed, 1+2 will be calculated and displayed (3), then when = is typed, it turns out to be 9.
4. The unary operatiors (+/-, %, abs) apply on the number in display **immediately**. But it will take no effect when waiting for a number (after a binary operator is typed and before any number is typed).