// Define the addition function
function add(x, y) {
  // Ensure both inputs are numbers before adding
  if (typeof x !== 'number' || typeof y !== 'number') {
    throw new Error('Both inputs must be numbers');
  }

  // Calculate and return the sum
  return x + y;
}

// Example usage:
const result = add(5, 3);
console.log(result); // Output: 8

// Call the addition function with different inputs as needed