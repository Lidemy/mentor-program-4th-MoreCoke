2
2
undefined

可以利用 function.call 協助判斷， this 的值取決怎麼被呼叫，因為它是在 js 的 runtime 建立的。

1. `obj.inner.hello() // ??`

可以看成 `obj.inner.hello.call(obj.inner)`

2. `obj2.hello() // ??`

因為 `const obj2 = obj.inner`，所以能看成 `obj.inner.hello.call(obj.inner)`

3. `hello() // ??`

可以看成 `hello.call()`
