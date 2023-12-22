// Import the add function from App.js
const add = require('./App');
export default add;

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

test('adds 5 + 4 to equal 9', () => {
  expect(add(5, 4)).toBe(9);
});

test('handles negative numbers', () => {
  expect(add(-3, 2)).toBe(-1);
});

test('throws an error if inputs are not numbers', () => {
  expect(() => add('hello', 5)).toThrow('Both inputs must be numbers');
  expect(() => add(5, null)).toThrow('Both inputs must be numbers');
});