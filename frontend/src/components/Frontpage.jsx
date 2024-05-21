import { MdOutlineMovieFilter } from "react-icons/md"
import { LiaUserFriendsSolid } from "react-icons/lia"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import MovieCard from "./MovieCard"
import { fetchUsersFromSanity } from "../../sanity/services/userServices"
import { fetchMoviesFromSanity } from "../../sanity/services/movieServices"

export default function Frontpage({user}) {
    
    const [wishlistMovies, setWishlistMovies] = useState([])
    const [otherUsers, setOtherUsers] = useState([])

    useEffect(() => {
        async function fetchWishlistMovies() {
            try {
                const users = await fetchUsersFromSanity()
                const currentUser = users.find(u => u.username === user)
                if (currentUser && currentUser.wishlist) {
                    const wishlistMovieIds = currentUser.wishlist.map(ref => ref._ref)
                    const wishlistMovies = await fetchMoviesFromSanity(wishlistMovieIds)
                    setWishlistMovies(wishlistMovies)
                }
            } catch (error) {
                console.error("Error", error)
            }
        }
        fetchWishlistMovies()
    }, [user])

    useEffect(() => {
        async function fetchOtherUsers() {
            try {
                const users = await fetchUsersFromSanity()
                const filteredUsers = users.filter(u => u.username !== user)
                setOtherUsers(filteredUsers)
            } catch (error) {
                console.error("Error", error)
            }
        }
        fetchOtherUsers()
    }, [user])

    return (
        <>
        <section>
            <article className="wishMovies">
                <h2 className="text">Hei, {user}!</h2>
                <h3 className="text"><MdOutlineMovieFilter /> Filmer jeg skal se!</h3>
                <p className="text">Disse filmene ligger i ønskelisten din:</p>
                <MovieCard movies={wishlistMovies} />
            </article>
            <article className="watchTogether">
                <h3><LiaUserFriendsSolid /> Jeg skal se sammen med</h3>
                <ul>
                    {otherUsers.map(otherUser => (
                        <li key={otherUser._id}>
                            <Link to={`/dashboard/${otherUser.username}`}>{otherUser.username}</Link>
                        </li>
                    ))}
                </ul>
            </article>
        </section>
        </>
    )
}