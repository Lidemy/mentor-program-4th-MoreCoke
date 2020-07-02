const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', (line) => {
  lines.push(line);
});

function solve(line) {
  let [n, m] = line[0].split(' ');
  n = Number(n);
  m = Number(m);
  for (let i = n; i <= m; i += 1) {
    const arr = Array.from(i.toString()).map(Number);
    const len = arr.length;
    let narc = 0;
    for (let j = 0; j < len; j += 1) {
      narc += arr[j] ** len;
    }
    // narc 全部加完再檢查，不然數字可能會重複印 ex: 370
    if (narc === i) {
      console.log(narc);
    }
  }
}

rl.on('close', () => {
  solve(lines);
});
