const fs = require('fs')
const superagent = require('superagent')

const readFilePromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject(`Couldn't find that file`)
      resolve(data)
    })
  })
}

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write the file')
      resolve('Successfully wrote the file!')  
    })
  })
}

const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`)
    console.log(`Breed: ${data}`)
    const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
    console.log(res.body.message)
  
    await writeFilePromise('dog-img.txt', res.body.message)
  } catch (err) {
    console.log(err)
    throw(err)
  }
  return '2:ready!'
}

(async () => {
  try {
    console.log('1: will get dog pics')
    const x = await getDogPic()
    console.log(x)
    console.log('Done getting dog pics')
  } catch(err) {
    console.log('ERROR')
  }
})()

// console.log('1: will get dog pics')
// getDogPic().then(x => { 
//   console.log(x)
//   console.log('3: done getting dog pics')
// }).catch(err => {
//   console.log('ERROR: ', err)
// })


// readFilePromise(`${__dirname}/dog.txt`)
//   .then(data => {
//     console.log(`Breed: ${data}`)
    
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//   })
//   .then(res => { 
    
//     return writeFilePromise('dog-img.txt', res.body.message)
//   })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(err => console.log(err))
 



