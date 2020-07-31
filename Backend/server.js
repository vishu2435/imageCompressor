const express=require('express')
const app=express()
const fileUpload=require('express-fileupload')
const bodyparser=require('body-parser')
const cors=require('cors')
const compress=require('./imageModule/imageCompress')
const path=require('path')
app.use(fileUpload())
app.use(bodyparser.urlencoded( ))
app.use(bodyparser.json())



var corsOptions={
    origin:'*',
    optionSuccessStatus:200,

}

app.use(cors(corsOptions))
app.get('/',(req,res)=>{
    return res.send("Helo")
})

app.post('/image/compress',(req,res)=>{
    console.log("[server.js] ",req.files)
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            fileUploaded:false
        });
      }

    let imageFile=req.files.imageFile;
    compress(imageFile)
    .then(response=>{
        console.log("Response from image compress ",response)
        return res.status(200).json({
            fileCompressed:true,
            filepath:`./uploads/${response.filename}`
        })
    })
    .catch(err=>{
        console.log("Err from image compress ",err)
        return res.status(500).json({
            fileCompressed:false
        })
    })

        
})
app.get('/download',(req,res)=>{
    console.log(req.query)
    res.sendFile(path.join(__dirname,req.query.filepath),(err)=>{
        if(err){
            console.log("[app.get/download] err" ,err)
        }
    })  
})


app.listen('1080',()=>{
    console.log("Server started on ",1080)
})