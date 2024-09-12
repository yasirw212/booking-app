
import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'

function App() {

  return (
      <Routes>
        <Route path='/' element={<Layout>
          <span >Home Page</span>  
        </Layout>}></Route>
        <Route path='/search' element={<Layout>
          <p>Search Page</p>
        </Layout>}></Route>
      </Routes>
  )
}

export default App
