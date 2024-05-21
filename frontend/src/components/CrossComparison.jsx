import { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { fetchMoviesFromSanity } from '../../sanity/services/movieServices'

export default function CrossComparison({userFavorites, otherUserWishlist, otherUserFavorites, userWishlist}) {
    
    const apiKey = process.env.REACT_APP_API_KEY
    
    const [comparisonMovies, setComparisonMovies] = useState([])
    
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
        } catch (error) {
            console.error("Error fetching movie from API", error)
            return null
        }
    }
    useEffect(() => {
        const fetchComparisonMovies = async () => {
            try {
                const userFavoritesMovies = await fetchMoviesFromSanity(userFavorites.map(ref => ref._ref))
                const otherUserWishlistMovies = await fetchMoviesFromSanity(otherUserWishlist.map(ref => ref._ref))
                const otherUserFavoritesMovies = await fetchMoviesFromSanity(otherUserFavorites.map(ref => ref._ref))
                const userWishlistMovies = await fetchMoviesFromSanity(userWishlist.map(ref => ref._ref))
    
                const fetchDetailsForMovies = async (movies) => {
                    return Promise.all(movies.map(async (movie) => {
                        const apiMovieDetails = await fetchMoviesFromAPI(movie.imdb_id)
                        return {
                            ...movie,
                            details: {
                                primaryImage: apiMovieDetails?.primaryImage || null
                            }
                        }
                    }))
                }
    
                const [userFavoritesMoviesWithDetails, otherUserWishlistMoviesWithDetails, otherUserFavoritesMoviesWithDetails, userWishlistMoviesWithDetails] = await Promise.all([
                    fetchDetailsForMovies(userFavoritesMovies),
                    fetchDetailsForMovies(otherUserWishlistMovies),
                    fetchDetailsForMovies(otherUserFavoritesMovies),
                    fetchDetailsForMovies(userWishlistMovies)
                ])
    
                const crossListMovies = [
                    ...userFavoritesMoviesWithDetails.filter(movie => otherUserWishlistMoviesWithDetails.some(otherMovie => otherMovie._id === movie._id)).map(movie => ({...movie})),
                    ...otherUserWishlistMoviesWithDetails.filter(movie => userFavoritesMoviesWithDetails.some(favMovie => favMovie._id === movie._id)).map(movie => ({...movie})),
                    ...otherUserFavoritesMoviesWithDetails.filter(movie => userWishlistMoviesWithDetails.some(wishMovie => wishMovie._id === movie._id)).map(movie => ({...movie})),
                    ...userWishlistMoviesWithDetails.filter(movie => otherUserFavoritesMoviesWithDetails.some(favMovie => favMovie._id === movie._id)).map(movie => ({...movie}))
                ]
                

                const uniqueMovies = crossListMovies.filter((movie, index, self) => self.findIndex(m => m._id === movie._id) === index)

                setComparisonMovies(uniqueMovies)
            } catch (error) {
                console.error("Error fetching comparison movies", error)
            }
        }
    
        fetchComparisonMovies()
    }, [userFavorites, otherUserWishlist, otherUserFavorites, userWishlist])
    
    return (
        <section>
        <h3>Sammenligning av Favoritter og Ønskeliste</h3>
            {comparisonMovies.map(movie => (
                <>
                <MovieCard key={movie._id} movies={comparisonMovies} />
                <p>BRUKER sin favoritt og fra BRUKER sin ønskeliste</p>
                </>
            ))}
    </section>
    )
}
