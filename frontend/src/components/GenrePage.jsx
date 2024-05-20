import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { fetchGenresFromSanity } from '../../sanity/services/genreServices'
import { fetchMoviesByGenre } from '../../sanity/services/movieServices'

export default function GenrePage() {
    const { genre } = useParams()

    const [movies, setMovies] = useState([])
    const [theGenre, setTheGenre] = useState(null)

    useEffect(() => {
        const fetchGenreData = async () => {
            try {
                const genres = await fetchGenresFromSanity()
                const selectedGenre = genres.find(g => g.genrename.toLowerCase() === genre.toLowerCase())
                setTheGenre(selectedGenre)

                if (selectedGenre) {
                    const movies = await fetchMoviesByGenre(selectedGenre._id)
                    setMovies(movies)
                }
            } catch (error) {
                console.error("Error", error)
            }
        }
        fetchGenreData()
    }, [genre])

    return (
        <>
        <h2>Sjanger: {genre.charAt(0).toUpperCase() + genre.slice(1)} ({movies.length} filmer)</h2>
        <section>
            <h3>Artikler</h3>
            <MovieCard movies={movies} />
        </section>
        </>
    )
}
