import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function MovieCard() {
    const [movies, setMovies] = useState([])

    const url = 'https://moviesdatabase.p.rapidapi.com/titles'
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '622064979dmshb793aad339faa93p144338jsn84422a530db4',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        }
        
    const fetchData = async () => {
        try {
            const response = await fetch(url, options)
            const data = await response.json()
            setMovies(data.results)
        } catch {
            console.error("Error")
        }
    }

    useEffect(() => {
        fetchData()
      }, [])
 
    console.log('Movies:', movies)

    return (
        <>
            {movies?.map(movie => (
                <article key={movie._id}>
                    <img src={movie.primaryImage?.id} alt={movie.titleText.text} />
                    <Link to={`https://www.imdb.com/title/${movie.id}`} target="_blank">{movie.titleText.text}</Link>
                </article>
            ))}
        </>
    
    )
}
