const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function isPrime(n) {
  // 找根號以內的數就好，這是數學小知識
  const num = Math.sqrt(n);
  if (n === 1) {
    return 'Composite';
  }
  for (let i = 2; i <= num; i += 1) {
    if (n % i === 0) {
      return 'Composite';
    }
  }
  return 'Prime';
}

function solve(line) {
  for (let i = 1; i < line.length; i += 1) {
    const n = Number(line[i]);
    console.log(isPrime(n));
  }
}

rl.on('close', () => {
  solve(lines);
});
