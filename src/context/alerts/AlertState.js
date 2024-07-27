import AlertContext from './AlertContext'
import { useState } from 'react'

export default function AlertState(props) {
    const [alert, setAlert] = useState(null)
    const displayAlert = (types, msg)=>{
      setAlert({
        msg: msg,
        type: types
      })
      if(types !== 'info')
      setTimeout(()=>{
        setAlert(null);
      }, 3000);
    }
    const clearAlert = ()=>{
        setTimeout(()=>{
            setAlert(null);
          }, 100);
    }
  return (
    <AlertContext.Provider value={{alert,displayAlert, clearAlert}}>
        {props.children}
    </AlertContext.Provider>
  )
}
