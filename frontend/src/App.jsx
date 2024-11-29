import Register from './SignUpPage'
import Login from './LoginPage/Index.jsx'
import './App.css'
import './css/satoshi.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ToasterMessage from './global/Toaster.jsx'
import Home from './HomePage/index.jsx'
function App() {
  return (
    <>
    <Router>
    <ToasterMessage/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </Router>
    
      
    </>
  )
}

export default App
