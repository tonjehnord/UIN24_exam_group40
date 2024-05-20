import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchMoviesFromSanity } from '../../sanity/services/movieServices'

export default function MovieCard({ movies }) {
   
    const [movieDetails, setMovieDetails] = useState([])

    const apiKey = process.env.REACT_APP_API_KEY

    const fetchMoviesFromAPI = async (imdb_id) => {
        const url = `https://moviesdatabase.p.rapidapi.com/titles/${imdb_id}`
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
        } catch {
            console.error("Error")
        }
    }

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const details = await Promise.all(
                    movies.map(async (movie) => {
                        const sanityMovie = await fetchMoviesFromSanity(movie._id)
                        const apiMovieDetails = await fetchMoviesFromAPI(movie.imdb_id)
                        return {
                            ...movie,
                            details: {
                                ...sanityMovie.details,
                                primaryImage: apiMovieDetails.primaryImage
                            }
                        }
                    })
                )
                setMovieDetails(details)
            } catch {
                console.error("Error")
            }
        }
        fetchMovieDetails()
    }, [movies])

    return (
        <>
            {movieDetails.map(movie => (
                <article key={movie._id}>
                    <img src={movie.details.primaryImage?.url} alt={movie.movietitle} />
                    <Link to={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank">{movie.movietitle}</Link>
                </article>
            ))}
        </>
    )
}
