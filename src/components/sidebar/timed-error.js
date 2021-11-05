import React, {useState,useEffect} from 'react'

function TimedError({errorMessage}) {
    const [visible, setVisible] = useState(false)
   useEffect(() => {
     if(!errorMessage){
      setVisible(false)
      return
     }
     setVisible(true)
     const timer = setTimeout(() => {
       setVisible(false)
     }, 5000);
     return () => clearTimeout(timer);
   }, [errorMessage]) 
   if(!visible) return null
    return (
        <div className="error-message">
            <strong>Error : </strong>
            <span>{errorMessage}</span>
        </div>
    )
}

export default TimedError
