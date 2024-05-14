const fs = require('fs')
const http = require('http')
const url = require('url')
const slugify = require('slugify')
const replaceTemplate = require('./modules/replaceTemplate')

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const slugs = dataObj.map(item => slugify(item.productName, { lower: true }))

console.log(slugs)

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true)
  
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' })

    const cardsHtml = dataObj.map(item => replaceTemplate(tempCard, item))
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml)
    res.end(output)

  } else if (pathname === '/product') {
    const product = dataObj.find(item => item.id.toString() === query.id)
    if (product) {
      const productHtml = replaceTemplate(tempProduct, product)
      res.writeHead(200, { 'Content-type': 'text/html' })
      res.end(productHtml)
    } else {
      res.writeHead(404, { 'Content-type': 'text/html' })
      res.end('<h1>Product not found<h1>')
    }

  } else if (pathname === '/api') { 
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(data)

  } else { 
    res.writeHead(404, { 'Content-type': 'text/html' })
    res.end('<h1>Page not found<h1>')
  }

})

server.listen(8000, '127.0.0.1', () => {
  console.log('listening on port 8000')
})
