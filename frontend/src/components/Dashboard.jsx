import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import CrossComparison from './CrossComparison'
import { fetchUsersFromSanity } from "../../sanity/services/userServices"
import { fetchMoviesFromSanity } from "../../sanity/services/movieServices"
import { fetchGenresFromSanity } from "../../sanity/services/genreServices"

export default function Dashboard({user}) {
    const { username } = useParams()

    const [commonWishlist, setCommonWishlist] = useState([])
    const [commonFavorites, setCommonFavorites] = useState([])
    const [commonGenres, setCommonGenres] = useState([])
    const [userFavorites, setUserFavorites] = useState([])
    const [userWishlist, setUserWishlist] = useState([])
    const [otherUserFavorites, setOtherUserFavorites] = useState([])
    const [otherUserWishlist, setOtherUserWishlist] = useState([])

    useEffect(() => {
        const fetchCommonData = async () => {
            try {
                const users = await fetchUsersFromSanity()
                const currentUser = users.find(u => u.username === user)
                const otherUser = users.find(u => u.username === username)

                if (currentUser && otherUser) {
                    if (currentUser.wishlist && otherUser.wishlist) {
                        const currentUserWishlist = await fetchMoviesFromSanity(currentUser.wishlist.map(ref => ref._ref))
                        const otherUserWishlist = await fetchMoviesFromSanity(otherUser.wishlist.map(ref => ref._ref))
                        const commonWishlistMovies = currentUserWishlist.filter(movie => otherUserWishlist.some(otherMovie => otherMovie._id === movie._id))
                        setCommonWishlist(commonWishlistMovies)
                        setUserWishlist(currentUser.wishlist)
                        setOtherUserWishlist(otherUser.wishlist)
                    }

                    if (currentUser.favoritemovies && otherUser.favoritemovies) {
                        const currentUserFavorites = await fetchMoviesFromSanity(currentUser.favoritemovies.map(ref => ref._ref))
                        const otherUserFavorites = await fetchMoviesFromSanity(otherUser.favoritemovies.map(ref => ref._ref))
                        const commonFavoritesMovies = currentUserFavorites.filter(movie => otherUserFavorites.some(otherMovie => otherMovie._id === movie._id))
                        setCommonFavorites(commonFavoritesMovies)
                        setUserFavorites(currentUser.favoritemovies)
                        setOtherUserFavorites(otherUser.favoritemovies)
                    }

                    if (currentUser.favoritegenres && otherUser.favoritegenres) {
                        const genres = await fetchGenresFromSanity()
                        const currentUserGenres = currentUser.favoritegenres.map(ref => genres.find(genre => genre._id === ref._ref)?.genrename)
                        const otherUserGenres = otherUser.favoritegenres.map(ref => genres.find(genre => genre._id === ref._ref)?.genrename)
                        const commonGenres = currentUserGenres.filter(genre => genre && otherUserGenres.includes(genre))
                        setCommonGenres(commonGenres)
                    }
                }
            } catch (error) {
                console.error("Error", error)
            }
        }
        fetchCommonData()
    }, [user, username])

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
                    <li key={index}><Link to={`/genres/${genre.toLowerCase()}`}>{genre}</Link></li>
                ))}
            </ul>
        </section>
        <CrossComparison userFavorites={userFavorites} otherUserWishlist={otherUserWishlist} otherUserFavorites={otherUserFavorites} userWishlist={userWishlist} />
        </>
    )
}
