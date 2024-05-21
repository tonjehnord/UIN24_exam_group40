import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Layout from './components/Layout'
import Frontpage from './components/Frontpage'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Genres from './components/Genres'
import GenrePage from './components/GenrePage'

function App() {

  const [user, setUser] = useState("")

  return (
    <>
    {!user && <Login setUser={setUser} />}
    {user && (
      <Layout user={user}>
        <Routes>
          <Route index element={<Frontpage user={user}/>} />
          <Route path="/dashboard/:username" element={<Dashboard user={user}/>} />
          <Route path="/genres" element={<Genres user={user}/>} />
          <Route path="/genres/:genre" element={<GenrePage />} />
        </Routes>
      </Layout>
    )}
    </>
  )
}

export default App
