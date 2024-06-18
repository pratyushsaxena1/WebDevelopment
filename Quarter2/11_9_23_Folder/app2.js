let https = require('https')

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

async function main() {
    console.log(await downloadPromise("https://geocoding.geo.census.gov/geocoder/locations/address?street=6560+Braddock+Road&city=Alexandria&state=VA&benchmark=2020&format=json"))
}
  
main()