import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import PublicRoutes from './utils/PublicRoutes'



function App() {

  return (
     <div className='App'>
     <Routes>
      <Route element={<PublicRoutes/>}>
        <Route path='/' element={<SignupPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Route>
     </Routes>
     </div>
  )
}

export default App
