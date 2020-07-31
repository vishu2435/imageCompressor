import React,{Component} from 'react'

class Button extends Component{
    
    selectImage=()=>{
        document.getElementById("FileIDs").click()
    }
 

    render(){
        return(
            <button onClick={this.selectImage} type="button">
            {this.props.children}
            <input onChange={this.props.imageFile} id="FileIDs" type="file" accept="image/*" style={{display:'none'}}/>
        </button>  
        )
    
    }
    
}
export default Button