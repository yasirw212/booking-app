
import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import { useAppContext } from './contexts/AppContext'
import { AddHotel } from './pages/AddHotel'

function App() {
  const { isLoggedIn } = useAppContext();

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
        {
          isLoggedIn && (
            <>
              <Route path='/add-hotel' element={<Layout><AddHotel /></Layout>} />
              
            </>
          )
        }
        <Route path='/' element={<Layout> 
          <span >Home Page</span>  
        </Layout>}></Route>
      </Routes>
  )
}

export default App
