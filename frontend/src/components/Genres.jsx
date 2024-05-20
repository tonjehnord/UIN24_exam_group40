import { MdFavorite, MdFavoriteBorder } from "react-icons/md"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchUsersFromSanity } from "../../sanity/services/userServices"
import { fetchGenresFromSanity } from "../../sanity/services/genreServices"

export default function Genres({ user }) {
    const [genres, setGenres] = useState([])
    const [favoriteGenres, setFavoriteGenres] = useState([])

    const fetchUserFavoriteGenres = async () => {
        try {
            const users = await fetchUsersFromSanity()
            const currentUser = users.find(u => u.username === user)
            if (currentUser && currentUser.favoritegenres) {
                const genres = await fetchGenresFromSanity()
                const userFavoriteGenres = currentUser.favoritegenres.map(ref => genres.find(genre => genre._id === ref._ref)?.genrename)
                setFavoriteGenres(userFavoriteGenres)
            }
        } catch (error) {
            console.error("Error", error)
        }
    }

    useEffect(() => {
        const getGenres = async () => {
            const genres = await fetchGenresFromSanity()
            setGenres(genres.map(genre => genre.genrename))
        }
        getGenres()
        if (user) {
            fetchUserFavoriteGenres()
        }
    }, [user])

    return (
        <>
        <h2>Sjangere</h2>
            <ul>
                {genres && genres.filter(genre => genre).map((genre, index) => {
                    const isFavorite = favoriteGenres.includes(genre)
                    return (
                        <li key={index}>
                            <Link to={`/genres/${genre.toLowerCase()}`}>{genre}</Link>
                            <button>
                                {isFavorite ? (
                                    <>
                                        <MdFavorite /> Favorittsjanger
                                    </>
                                ) : (
                                    <>
                                    <MdFavoriteBorder /> Legg til som favoritt 
                                    </>
                                )}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}
