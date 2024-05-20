import { MdFavorite } from "react-icons/md"
import { LiaUserFriendsSolid } from "react-icons/lia"
import { useEffect, useState } from "react"
import MovieCard from "./MovieCard"
import { fetchUsersFromSanity } from "../../sanity/services/userServices"

export default function Frontpage({user}) {

    const [otherUsers, setOtherUsers] = useState([])

    useEffect(() => {
        async function fetchOtherUsers() {
            try {
                const users = await fetchUsersFromSanity()
                const filteredUsers = users.filter(u => u.username !== user)
                setOtherUsers(filteredUsers)
            } catch (error) {
                console.error(error)
            }
        }
        fetchOtherUsers()
    }, [user])

    return (
        <>
        <section>
            <h2>Hei, {user}!</h2>
            <h3><MdFavorite /> Filmer jeg skal se!</h3>
            <p>Disse filmene ligger i ønskelisten din:</p>
            <MovieCard />
        </section>
        <section>
            <h3><LiaUserFriendsSolid /> Jeg skal se sammen med</h3>
            <ul>
                {otherUsers.map(otherUser => (
                    <li key={otherUser._id}>{otherUser.username}</li>
                ))}
            </ul>
        </section>
        </>
    )
}