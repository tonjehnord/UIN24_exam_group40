import { MdFavorite, MdFavoriteBorder } from "react-icons/md"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchUsersFromSanity, updateFavoriteGenres } from "../../sanity/services/userServices"
import { fetchGenresFromSanity } from "../../sanity/services/genreServices"

export default function Genres({user}) {
   
    const [genres, setGenres] = useState([])
    const [favoriteGenres, setFavoriteGenres] = useState([])
    const [currentUserId, setCurrentUserId] = useState(null)

    useEffect(() => {
        const getGenres = async () => {
            try {
                const genresData = await fetchGenresFromSanity()
                setGenres(genresData.map(genre => genre.genrename))
            } catch (error) {
                console.error("Error", error)
            }
        }

        const fetchUserFavoriteGenres = async () => {
            try {
                const users = await fetchUsersFromSanity()
                const currentUser = users.find(u => u.username === user)
                if (currentUser) {
                    setCurrentUserId(currentUser._id)
                    if (currentUser.favoritegenres) {
                        const genresData = await fetchGenresFromSanity()
                        const userFavoriteGenres = currentUser.favoritegenres.map(ref => 
                            genresData.find(genre => genre._id === ref._ref)?.genrename
                        )
                        setFavoriteGenres(userFavoriteGenres)
                    }
                }
            } catch (error) {
                console.error("Error", error)
            }
        }
        getGenres()
        if (user) {
            fetchUserFavoriteGenres()
        }
    }, [user])

    const handleFavoriteToggle = async (genre) => {
        if (currentUserId) {
            const updatedFavoriteGenres = favoriteGenres.includes(genre)
                ? favoriteGenres.filter(favGenre => favGenre !== genre)
                : [...favoriteGenres, genre]

            try {
                const genresData = await fetchGenresFromSanity()
                const updatedFavoriteGenreRefs = updatedFavoriteGenres.map(favGenre => 
                    genresData.find(g => g.genrename === favGenre)._id
                ).map(id => ({ _ref: id, _type: "reference" }))
                
                const result = await updateFavoriteGenres(currentUserId, updatedFavoriteGenreRefs)
                if (result === "Success") {
                    setFavoriteGenres(updatedFavoriteGenres)
                } else {
                    console.error("Error updating favorite genres:", result)
                }
            } catch (error) {
                console.error("Error", error)
            }
        }
    }

    return (
        <>
        <h2>Sjangere</h2>
        <ul className="genres">
            {genres && genres.filter(genre => genre).map((genre, index) => {
                const isFavorite = favoriteGenres.includes(genre)
                return (
                    <li key={index}>
                        <Link to={`/genres/${genre.toLowerCase()}`}>{genre}</Link>
                        <button onClick={() => handleFavoriteToggle(genre)}>
                            {isFavorite ? (<><MdFavorite /> Favorittsjanger</>) : (<><MdFavoriteBorder /> Legg til som favoritt </>)}
                        </button>
                    </li>
                )
            })}
        </ul>
        </>
    )
}
