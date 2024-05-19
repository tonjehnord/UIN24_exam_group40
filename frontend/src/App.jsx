import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Frontpage from './components/Frontpage'

function App() {

  return (
    <Layout>
     <Routes>
      <Route index element={<Frontpage />} /> 
     </Routes>
    </Layout>
  )
}

export default App
