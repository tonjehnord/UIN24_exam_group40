import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './App.css'
import Layout from './components/Layout'
import Frontpage from './components/Frontpage'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {

  const [user, setUser] = useState("")

  //Lagrer brukeren som er logget inn, refresher man hopper man ikke ut til innlogginsside
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      setUser(loggedInUser)
    }
  }, [])

  return (
    <>
      {!user && <Login setUser={setUser} />}
      {user && (
        <Layout user={user}>
          <Routes>
            <Route index element={<Frontpage user={user}/>} />
            <Route path="/dashboard/:username" element={<Dashboard user={user}/>} />
          </Routes>
        </Layout>
      )}
    </>
  )
}

export default App
