import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchUsersFromSanity } from "../../sanity/services/userServices"

export default function Login({setUser}) {

    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getUsers() {
            try {
                const users = await fetchUsersFromSanity()
                setUsers(users)
            } catch (error) {
                console.error("Error", error)
            }
        }
        getUsers()
    }, [])

    const handleUserLogin = (user) => {
        try {
            setUser(user)
            localStorage.setItem("loggedInUser", user)
            navigate('/')
        } catch (error) {
            console.error("Error", error)
        }
    }

    return (
        <>
            <h1>Hvem skal se i dag?</h1>
            <p>Velg bruker</p>
            {users.map((user) => (
                <button key={user._id} onClick={() => handleUserLogin(user.username)}>{user.username}</button>
            ))}
        </>
    )
}