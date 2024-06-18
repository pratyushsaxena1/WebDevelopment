let https = require('http')
const fs = require('fs')

function downloadPromise(url) {
  return new Promise( (resolve, reject) => {
    https.get(url, function(response){
      let full_reponse = ""
      response.on('data', (chunk)=>{full_reponse+=chunk})
      response.on('end', ()=>{resolve(full_reponse)})
    }).on('error', function(err){
      reject(err)
    })    
  })
}

function writeToFile(data) {
    return new Promise( (resolve, reject) => {
        fs.writeFile('foo2.txt', data, (err) => {
            if (err) reject(err);
            resolve();
          });    
    })
  }


async function main() {
    const data = await downloadPromise("http://localhost:3000")
    await writeToFile(data)
}
  
main()