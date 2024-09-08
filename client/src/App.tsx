
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'

function App() {

  return (
    // <>
      <Routes>
        <Route path='/' element={<Layout></Layout>}></Route>
        <Route path='/search'></Route>
        {/* <Route path='*' element={<Navigate to="/" />}></Route> */}
      </Routes>
    // </>
  )
}

export default App
