
import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import { useForm } from 'react-hook-form'
import SignIn from './pages/SignIn'

type RegisterFormData = {
  firstName: string;
  lastName: string; 
  email: string;
  password: string;
  confirmPassword: string;
}

function App() {

  return (
      <Routes>
        
        <Route path='/register' element={<Layout>
          <Register />
        </Layout>}>
        </Route>
        <Route path='/sign-in' element={<Layout>
          <SignIn />
        </Layout>}>
        </Route>
        <Route path='/search' element={<Layout>
          <p>Search Page</p>
        </Layout>}></Route>
        <Route path='/' element={<Layout> 
          <span >Home Page</span>  
        </Layout>}></Route>
      </Routes>
  )
}

export default App
