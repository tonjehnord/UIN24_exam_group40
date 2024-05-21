import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function MovieCard({movies}) {
    
    const apiKey = process.env.REACT_APP_API_KEY
    
    const [movieDetails, setMovieDetails] = useState([])

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
            console.error("Error fetching movie from API", error)
            return null
        }
    }

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const details = await Promise.all(
                    movies.map(async (movie) => {
                        const apiMovieDetails = await fetchMoviesFromAPI(movie.imdb_id)
                        return {
                            ...movie,
                            details: {
                                primaryImage: apiMovieDetails?.primaryImage || null
                            }
                        }
                    })
                )
                setMovieDetails(details)
            } catch {
                console.error("Error", error)
            }
        }
        fetchMovieDetails()
    }, [movies])

    return (
        <>
        {movieDetails.map(movie => (
            <article className="movieArticle" key={movie._id}>
                <img src={movie.details.primaryImage?.url} alt={movie.movietitle} />
                <p><Link to={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank">{movie.movietitle}</Link></p>
            </article>
        ))}
        </>
    )
}