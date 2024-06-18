const fs = require('fs')

function delayPromise(file_name) {
    return new Promise( (resolve) => {
        fs.readFile(file_name, (err, data) => {
            if (err) throw err;
            resolve(data.toString());
        });
    })
}

async function main() {
  console.log(await delayPromise("foo.txt"))
}

main()