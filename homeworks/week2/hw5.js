function join(arr, concatStr) {
  return arr.reduce((prev, curr, index) => {
    if (index < arr.length - 1) {
      prev += curr + concatStr;
    } else {
      prev += curr;
    }
    return prev;
  }, "");
}

function repeat(str, times) {
  var ans = "";
  for (var i = 1; i <= times; i++) {
    ans += str;
  }
  return ans;
}

console.log(join(["a"], "!"));
console.log(repeat("a", 5));
