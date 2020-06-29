const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

// 方法 1
function isPalindrome(arr1, arr2) {
  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return 'False';
    }
  }
  return 'True';
}

function solve(line) {
  const arr = line[0].split('');
  const reverseArr = arr.slice().reverse();
  console.log(isPalindrome(arr, reverseArr));
}

// 方法 2
// function solve(line) {
//   const str = line[0];
//   const reverseStr = str.split('').reverse().join('');
//   // str === reverseStr ? console.log('True') : console.log('False');
//   if (str === reverseStr) {
//     console.log('True');
//   } else {
//     console.log('False');
//   }
// }

rl.on('close', () => {
  solve(lines);
});
