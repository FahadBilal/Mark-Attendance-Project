import Register from './SignUpPage'
import './App.css'
import './css/satoshi.css'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      <Register/>
    </>
  )
}

export default App
