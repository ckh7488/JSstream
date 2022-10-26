const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const filePath = 'sslkey.log'

const fs = require('fs');
const file = fs.createReadStream(filePath, {encoding : 'utf8'});


let num = 0;

file.on('readable', async ()=>{
    let chunk, tmp = '';
    while(null !== (chunk = file.read(1))){
        if(chunk === '\n'){
            console.log(tmp);
            tmp = '';       
            await new Promise(resolve=>{
                rl.question("continue? (y/n)", (res)=>{
                    if(res !== 'y') process.exit();
                    resolve();
                })
            })     

        }
        else{
            tmp+=chunk;
        }
    }
    process.exit();
})



