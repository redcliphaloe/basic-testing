import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 20, b: 2, action: Action.Subtract, expected: 18 },
  { a: 0, b: 0, action: Action.Subtract, expected: 0 },
  { a: 1, b: 0, action: Action.Multiply, expected: 0 },
  { a: 2, b: 5, action: Action.Multiply, expected: 10 },
  { a: 3, b: -1, action: Action.Multiply, expected: -3 },
  { a: 1, b: 0, action: Action.Divide, expected: Infinity },
  { a: 0, b: 1, action: Action.Divide, expected: 0 },
  { a: 0, b: 0, action: Action.Divide, expected: NaN },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: 0, b: 1, action: Action.Exponentiate, expected: 0 },
  { a: 0, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 2, b: 3, action: 'x', expected: null },
  { a: 0, b: 1, action: 8, expected: null },
  { a: 0, b: 0, action: true, expected: null },
  { a: '1', b: 2, action: Action.Add, expected: null },
  { a: 2, b: 'x', action: Action.Add, expected: null },
  { a: true, b: 2, action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    '$a $action $b expected $expected',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
