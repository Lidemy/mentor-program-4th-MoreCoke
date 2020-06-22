function search(arr, n){
  if(n < arr[0] || n > arr[arr.length - 1]) {
  	return -1;
  }

  let L = 0, R = arr.length - 1;

  while(L <= R) {
  	let M = Math.floor((L + R) / 2);
  	if(n === arr[M]) {
  		return M;
  	} else if(arr[M] > n) {
  		R = M - 1;
  	} else {
  		L = M + 1;
  	}
  }
}
console.log(search([1, 3, 10, 14, 39], 14),
search([1, 3, 10, 14, 39], 299));