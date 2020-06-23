function search(arr, n){
	console.log('arr', arr, 'n', n);
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
	return -1;
}
console.log(search(createRandomArr(10), 14),
search(createRandomArr(15), 299));

function createRandomArr(len) {
	let arr = [];
	let i = 0;
	while (i < len) {
		let ran = Math.floor(Math.random() * 100);
		if(arr.indexOf(ran) === -1) {
			arr.push(ran);
			i++;
		}
	}
	return arr.sort((a, b) => a - b);
}

// console.log(search(createRandomArr(10), 23));
// console.log(search(createRandomArr(16),5));