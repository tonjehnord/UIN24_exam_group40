import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { fetchUsersFromSanity } from "../../sanity/services/userServices"
import { fetchMoviesFromSanity } from "../../sanity/services/movieServices"

export default function Dashboard({ user }) {
    
    const { username } = useParams()

    const [commonWishlist, setCommonWishlist] = useState([])
    const [commonFavorites, setCommonFavorites] = useState([])
    const [commonGenres, setCommonGenres] = useState([])

    useEffect(() => {
        const fetchCommonWishlistMovies = async () => {
            try {
                const users = await fetchUsersFromSanity()
                const currentUser = users.find(u => u.username === user)
                const otherUser = users.find(u => u.username === username)
    
                if (currentUser && otherUser && currentUser.wishlist && otherUser.wishlist) {
                    const currentUserWishlist = await fetchMoviesFromSanity(currentUser.wishlist.map(ref => ref._ref))
                    const otherUserWishlist = await fetchMoviesFromSanity(otherUser.wishlist.map(ref => ref._ref))
    
                    const commonWishlistMovies = currentUserWishlist.filter(movie => otherUserWishlist.some(otherMovie => otherMovie._id === movie._id))
                    setCommonWishlist(commonWishlistMovies);
                }
            } catch (error) {
                console.error("Error", error)
            }
        }
    
        const fetchCommonFavoritesMovies = async () => {
            try {
                const users = await fetchUsersFromSanity()
                const currentUser = users.find(u => u.username === user)
                const otherUser = users.find(u => u.username === username)
    
                if (currentUser && otherUser && currentUser.favoritemovies && otherUser.favoritemovies) {
                    const currentUserFavorites = await fetchMoviesFromSanity(currentUser.favoritemovies.map(ref => ref._ref))
                    const otherUserFavorites = await fetchMoviesFromSanity(otherUser.favoritemovies.map(ref => ref._ref))
    
                    const commonFavoritesMovies = currentUserFavorites.filter(movie => otherUserFavorites.some(otherMovie => otherMovie._id === movie._id))
                    setCommonFavorites(commonFavoritesMovies);
                }
            } catch (error) {
                console.error("Error", error)
            }
        }

        const fetchCommonGenres = async () => {
            try {
                const users = await fetchUsersFromSanity()
                const currentUser = users.find(u => u.username === user)
                const otherUser = users.find(u => u.username === username)
    
                if (currentUser && otherUser && currentUser.favoritegenres && otherUser.favoritegenres) {
                    const currentUserGenres = currentUser.favoritegenres.map(genre => genre.genrename)
                    const otherUserGenres = otherUser.favoritegenres.map(genre => genre.genrename)
                    const commonGenres = currentUserGenres.filter(genre => otherUserGenres.includes(genre))
                    setCommonGenres(commonGenres);
                }
            } catch (error) {
                console.error("Error", error)
            }
        }

        fetchCommonWishlistMovies()
        fetchCommonFavoritesMovies()
        fetchCommonGenres()
    }, [user, username])

    console.log(commonGenres)

    return (
        <>
            <h2>Forslag for {user} og {username}</h2>
            <section>
                <h3>Catch Up!</h3>
                <p>Dere har {commonWishlist.length} filmer felles i ønskelistene deres.</p>
                <MovieCard movies={commonWishlist}/>
            </section>
            <section>
                <h3>Go Safe!</h3>
                <p>Dere har {commonFavorites.length} filmer felles i favorittlisten deres.</p>
                <MovieCard movies={commonFavorites} />
            </section>
            <section>
                <h3>Utforsk!</h3>
                <p>Dere liker begge disse sjangerne, sjekk hvilke filmer som finnes å velge mellom:</p>
                <ul>
                    {commonGenres.map((genre, index) => (
                        <li key={index}>{genre}</li>
                    ))}
                </ul>
            </section>
        </>
    )
}
