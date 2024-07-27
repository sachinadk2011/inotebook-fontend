import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import AlertContext from '../context/alerts/AlertContext'


function Alert( ) {
  
  const {alert} = useContext(AlertContext);
  const capitalization =(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1).toLowerCase();
  }
  return (
    <div style={{height : '50px'}}>
   {  alert && <div className={`alert alert-${ alert.type}`} role="alert" >
      
  <strong>{capitalization(  alert.type === "danger"? "error":  alert.type)} !</strong> { alert.msg}
  
</div>}
</div>
  )};

Alert.propTypes = {
    type : PropTypes.string,
    msg : PropTypes.string
}
Alert.default  = {
    type : "success",
    msg : "Note is added" 
}

export default Alert