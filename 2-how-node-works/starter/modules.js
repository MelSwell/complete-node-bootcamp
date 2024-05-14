// console.log(arguments)
// console.log(require('module').wrapper)
const C = require('./test-module-1')
const calc1 = new C

// module.exports
console.log(calc1.add(1, 2))
console.log(calc1.multiply(5, 5))

// exports
const { multiply, add }= require('./test-module-2')
console.log(multiply(2, 5))
console.log(add(5, 6))

// caching
require('./test-module-3')()
require('./test-module-3')()
require('./test-module-3')()