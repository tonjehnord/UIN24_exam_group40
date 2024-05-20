import { MdFavoriteBorder } from "react-icons/md"
import { useEffect, useState } from "react"

export default function Genres() {

    const apiKey = process.env.REACT_APP_API_KEY

    const [genres, setGenres] = useState([])

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

    useEffect(() => {
        const getGenres = async () => {
            const genres = await fetchGenresFromAPI()
            setGenres(genres)
        }
        getGenres()
    }, [])

    return (
        <div>
            <h2>Sjangere</h2>
            <ul>
                {genres && genres.filter(genre => genre).map((genre, index) => (
                    <li key={index}>{genre}
                        <button><MdFavoriteBorder /> Legg til som favoritt</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
