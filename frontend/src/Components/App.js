import React ,{Component}from 'react';
import Button from './Button'

import ImageViewer from './ImageViewer/ImageViewer'
import Image from './Image/Image' 
import axios from 'axios'
import crypto from 'crypto'
import styles from './App.module.css'

class App extends Component {

  state={
    imgSrc:[],
    imgIdToFile:{},
    
  }
  imageFile=(event)=>{
    var file=event.target.files[0]
    var fileReader=new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload=()=>{
        var imgSrc=this.state.imgSrc
        var imgIdToFile=this.state.imgIdToFile
        imgIdToFile[crypto.randomBytes(16).toString('hex')]={
                                          file:file,
                                          filepath:'',
                                          startCompressing:"NOT_STARTED",
                                          compressSucceded:false,
                                         compressFailed:false
                                          }
        
        imgSrc.push(fileReader.result)
        this.setState({
            imgSrc:imgSrc,
            imgIdToFile:imgIdToFile
        })
    }
  }
  compressStart=(fileId)=>{
    // console.log("[App.js] compressStart ",fileId," state ",this.state)
    
    var form=new FormData()
    var file=this.state.imgIdToFile[fileId]
    var imgIdToFile=this.state.imgIdToFile
   
    imgIdToFile[fileId]['startCompressing']="STARTED"
    this.setState({
      imgIdToFile:imgIdToFile
    })
   
    // console.log("[App.js] [compressStart] file",file)
   
    form.append('imageFile',file['file'])
   
    axios.post('http://192.168.43.42:1080/image/compress',form,
    {
      headers:{
      'Content-Type':'multipart/form-data'
      }
    }).then(response=>{
      // console.log("[App.js] response data ",response.data)
      imgIdToFile[fileId]['startCompressing']="COMPLETED"
      imgIdToFile[fileId]['compressSucceded']=true
      imgIdToFile[fileId]['filepath']=response.data.filepath
      this.setState({
        
        imgIdToFile:imgIdToFile
      })
    }).catch(err=>{
      // console.log("[App.js] err data ",err)
    })
  }
startDownload=(fileid)=>{
  var file=this.state.imgIdToFile[fileid]
  console.log("Start Download [Appp.js] ",file)
  axios({
    url:`http://192.168.43.42:1080/download?filepath=${file.filepath}`,
    method:'GET',
    responseType:'blob'

  
  })
  .then(response=>{
    console.log("(startDownload) [App.js] response",response)
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link=document.createElement('a')
    link.href=url
    link.setAttribute('download',file.filepath.split('/')[2])
    document.body.appendChild(link)
    link.click();
  })
  .catch(err=>{
    console.log("(startDownload) [App.js] err",err)
  })
}
  
  render(){
  return (
    <div className={styles.back_box}>
            <Button imageFile={this.imageFile}>Upload</Button>
            <ImageViewer>
                {Object.keys(this.state.imgIdToFile).map((id,i)=>{
                    return <Image stateProps={this.state} download={this.startDownload} compress={this.compressStart} src={this.state.imgSrc[i]} key={id} id={id}/>
                })}
            </ImageViewer>
    </div>
  );
  }
}

export default App;
