import React from 'react'
import PropTypes from 'prop-types'

function Alert(props) {
  const capitalization =(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1).toLowerCase();
  }
  return (
    <div style={{height : '50px'}}>
   { props.alert && <div className={`alert alert-${props.alert.type}`} role="alert" >
      
  <strong>{capitalization( props.alert.type === "danger"? "error": props.alert.type)} !</strong> {props.alert.msg}
  
</div>}
</div>
  )};

Alert.propTypes = {
    type : PropTypes.string,
    msg : PropTypes.string
}
Alert.defaultProps = {
    type : "success",
    msg : "Note is added" 
}

export default Alert