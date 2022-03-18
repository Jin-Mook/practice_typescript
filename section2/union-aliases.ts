type Combinable = number | string;
type ConversionDescriptior = 'as-number' | 'as-text'

function combine(input1: Combinable, input2: Combinable, resultConversion: ConversionDescriptior) {
  let result;
  if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString()
  }
  return result
}

const combinedAges = combine(30, 24, 'as-number');
console.log(combinedAges)
const combinedNumAge = combine('30', '24', 'as-number');
console.log(combinedNumAge)
const combinedName = combine('Max', 'jinmook', 'as-text');
console.log(combinedName)