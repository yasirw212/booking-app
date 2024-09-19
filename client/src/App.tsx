
import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import { useForm } from 'react-hook-form'

type RegisterFormData = {
  firstName: string;
  lastName: string; 
  email: string;
  password: string;
  confirmPassword: string;
}

function App() {

  const { register } = useForm<RegisterFormData>(); 


  return (
      <Routes>
        
        <Route path='/register' element={<Layout>
          <Register />
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
