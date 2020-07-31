import React ,{Component} from 'react'
import styles from './ImageViewer.module.css'

const ImageViewer=(props)=>{
    return(
        <div className={styles.imageViewer}>
            {props.children}
        </div>
    )
} 

export default ImageViewer