import React, {useState,useEffect} from 'react'

function TimedError({errorMessage, visible, setVisible}) {
   useEffect(() => {
     const timer = setTimeout(() => {
       setVisible(false)
     }, 2000);
     return () => clearTimeout(timer);
   }, [visible]) 
   if(!visible) return null
    return (
        <div className="error-message">
            <strong>Error : </strong>
            <span>{errorMessage}</span>
        </div>
    )
}

export default TimedError
