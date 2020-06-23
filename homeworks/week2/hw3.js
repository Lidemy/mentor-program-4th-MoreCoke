function reverse(str) {
  var ans = "";
  for (var i = str.length - 1; i >= 0; i--) {
    ans += str[i];
  }
  console.log(ans);
}

reverse("hello");
