// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import busboy from "busboy"
import Stream from 'stream'

export default function handler(req, res) {
  const binData = []
  const bb = busboy({ headers: req.headers })
  bb.on('file', (n,f,i)=>{
    f.on('data', (d)=>{
      // console.log(d)
      binData.push(d)
    })
  })
  bb.on('close', ()=>{
    let stream = new Stream.Readable()
    stream.pipe(res)
    for(let d of binData){
      stream.push(d)
    }
    stream.push(null)
  
  })
  // console.log(req.headers)
  req.pipe(bb)
  // console.log(req)
}


export const config = {
  api: {
    bodyParser: false
  }
}