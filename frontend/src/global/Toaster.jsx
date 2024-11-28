import React from 'react'
import { Toaster } from 'react-hot-toast'


const ToasterMessage = () => {
  return (
    <Toaster position="top-right" reverseOrder={false}
    toastOptions={{
      duration:3000,
      className:"toaster",
      success:{
        style:{
          background:"green",
          color:"white"
        },
        iconTheme:{
          primary:"white",
          secondary:"green",
        },
      },
      error:{
        style:{
          background:"red",
          color:"white"
        },
        iconTheme:{
          primary:"white",
          secondary:"red",
        },
      },
    }}
    />
  )
}

export default ToasterMessage
