/* eslint-disable no-undef */
const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

// 自己的寫法
// function solve(line) {
//   for (let i = 1; i < line.length; i += 1) {
//     let [a, b, k] = line[i].split(' ');
//     a = BigInt(a);
//     b = BigInt(b);
//     k = Number(k);
//     if (k === 1) {
//       if (a > b) {
//         console.log('A');
//       } else if (b > a) {
//         console.log('B');
//       } else {
//         console.log('DRAW');
//       }
//     } else if (a < b) {
//       console.log('A');
//     } else if (b < a) {
//       console.log('B');
//     } else {
//       console.log('DRAW');
//     }
//   }
// }

// 解答
function solve(line) {
  const m = Number(line[0]);
  for (let i = 1; i <= m; i += 1) {
    let [a, b, p] = line[i].split(' ');
    a = BigInt(a);
    b = BigInt(b);
    p = Number(p);
    if (a === b) {
      console.log('DRAW');
    } else if ((a > b && p === 1) || (a < b && p === -1)) {
      console.log('A');
    } else {
      console.log('B');
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
