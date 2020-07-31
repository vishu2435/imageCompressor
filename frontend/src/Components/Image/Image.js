import React from 'react'
import styles from './Image.module.css'

const Image=(props)=>{
    var compressbutton= <button onClick={()=>props.compress(props.id)}>Compress</button>
    var downloadComponent=<button className={styles.buttonDisabled} disabled>Download</button>
    var startCompressing=props.stateProps.imgIdToFile[props.id]['startCompressing']
    var compressSucceded=props.stateProps.imgIdToFile[props.id]['compressSucceded']
    
    
    if(startCompressing==="STARTED"){
        compressbutton= <button className={styles.buttonDisabled} disabled>Compressing...</button>
    }
    if(startCompressing==="COMPLETED"){
        compressbutton= <button onClick={()=>props.compress(props.id)}>Compress</button>
    }
    if(compressSucceded&&startCompressing==="COMPLETED"){
        downloadComponent=<button onClick={()=>props.download(props.id)}>Download</button>
    }

    return(
        <div className={styles.image} >

            <img src={props.src} style={{width:"100%",height:"160px"}}/>
            <div className={styles.buttonContainer}>
            {compressbutton}
            {downloadComponent}
            </div>
        </div>
    )
}
export default Image