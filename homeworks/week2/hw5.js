function join(arr, concatStr) {
  if (arr.length === 0) return "";
  return arr.reduce((prev, curr) => {
    prev += concatStr + curr;
    return prev;
  });
}

function repeat(str, times) {
  let ans = "";
  for (let i = 1; i <= times; i++) {
    ans += str;
  }
  return ans;
}

console.log(
  join([], "!"),
  join(["a"], "!"),
  join([1, 2, 3], ""),
  join(["a", "b", "c"], "!"),
  join(["aaa", "bb", "c", "dddd"], ",,")
);
console.log(repeat("a", 5));
