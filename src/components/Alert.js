import React from 'react'
/* import PropTypes from 'prop-types'
 */
function Alert() {
  return (
   /*  {/* <div style={{height : '60px'}}> */
     /*  {props.alert && <div className={`"alert alert-${props.alert.type} `} role="alert">
    <strong>{props.alert.type}</strong>! {props.alert.msg}
  </div>} */
   /*  </div> */ 
  <div className="alert alert-success my-3" role="alert">
  A simple success alert—check it out!
</div>
  )
}
/* Alert.propTypes = {
    type : PropTypes.string,
    msg : PropTypes.string
}
Alert.defaultProps = {
    type : "success",
    msg : "Note is added" 
} */

export default Alert