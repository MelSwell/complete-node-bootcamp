const EventEmitter = require('events')
const http = require('http')


class Sales extends EventEmitter {
  constructor() {
    super()
  }
}

const emitter = new Sales()

emitter.on('newSale', () => console.log('New sale!!!!!!'))

emitter.on('newSale', () => {
  setTimeout(() => console.log('customer name: mel'), 3000)
})

emitter.on('newSale', stock => {
  console.log(`there are now ${stock} items remaining in stock`)
})

setTimeout(() => emitter.emit('newSale', 9), 3000)


//////////////////////////////

const server = http.createServer()

server.on('request', (req, res) => {
  console.log('request received')
  res.end('request received')
})

server.on('request', (req, res) => {
  console.log('the same request, new handler')
})

server.on('close', () => {
  console.log('server closed')
})

server.listen(8000, '127.0.0.1', () => {
  console.log('server listening on port 8000...')
})
