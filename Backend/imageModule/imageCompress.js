const Jimp=require('jimp')


const compress=(file)=>{
    return Jimp.read(file.data)
    .then(image=>{

        image.
        resize(640,1080).
        quality(50).
        brightness(0.2).
        write(`./uploads/${file.name}`)
        
        console.log("done")
        return {
            filename:file.name
        }
    }).catch(err=>{
        console.log('[ImageCompress.js]',err)
        
    })
    
    
    

}
module.exports=compress