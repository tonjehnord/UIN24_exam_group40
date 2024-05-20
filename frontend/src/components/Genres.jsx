import { MdFavoriteBorder } from "react-icons/md"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchUsersFromSanity } from "../../sanity/services/userServices"

export default function Genres({ user }) {

    const apiKey = process.env.REACT_APP_API_KEY

    const [genres, setGenres] = useState([])
    const [favoriteGenres, setFavoriteGenres] = useState([])

    const fetchGenresFromAPI = async () => {
        const url = 'https://moviesdatabase.p.rapidapi.com/titles/utils/genres'
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        }
        try {
            const response = await fetch(url, options)
            const data = await response.json()
            return data.results
        } catch (error) {
            console.error("Error fetching movie from API", error)
            return null
        }
    }

    const fetchUserFavoriteGenres = async () => {
        try {
            const users = await fetchUsersFromSanity()
            const currentUser = users.find(u => u.username === user)
            if (currentUser && currentUser.favoritegenres) {
                setFavoriteGenres(currentUser.favoritegenres)
            }
        } catch (error) {
            console.error("Error", error)
        }
    }

    useEffect(() => {
        const getGenres = async () => {
            const genres = await fetchGenresFromAPI()
            setGenres(genres)
        }
        getGenres()
        if (user) {
            fetchUserFavoriteGenres()
        }
    }, [user])
     
    return (
        <div>
            <h2>Sjangere</h2>
            <ul>
                {genres && genres.filter(genre => genre).map((genre, index) => (
                    <li key={index}><Link to={`/genres/${genre.toLowerCase()}`}>{genre}</Link>
                        <button><MdFavoriteBorder /> Legg til som favoritt</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
