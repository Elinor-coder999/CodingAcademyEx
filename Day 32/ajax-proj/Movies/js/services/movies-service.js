var gGenres
const GENRES_URL =  'https://api.themoviedb.org/3/genre/movie/list?api_key=1ed33b841931d4c2aa239dbe83d1f07d'
const genres_key = 'genres_db'
const movies_key = 'movies_db'

function getGenres(onSuccess){
    const genres = loadFromStorage(genres_key)

    if(genres){
        onSuccess(genres)
        return
    }

    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
        if(xhr.status === 200){
            const genres = JSON.parse(xhr.responseText).genres
            saveToStorage(genres_key, genres)
            onSuccess(genres)
        }
    }

    xhr.open('GET', GENRES_URL)
    xhr.send()
}

function getMoviesByGenre(genreId, onSuccess){
    const genre = getGenreById(genreId)
    const movies = loadFromStorage(movies_key) || {}

    if(movies[genre.name]){
        onSuccess(movies[genre.name])
        return
    }

    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
        if (xhr.status === 200) {
            const res = JSON.parse(xhr.responseText)
            console.log('res:', res)
            const moviesData = getPrepareData(res)
            console.log('moviesData:', moviesData)
            movies[genre.name] = moviesData
            saveToStorage(movies_key, movies)
            onSuccess(moviesData)
        }
    }
    xhr.open('GET', `https://api.themoviedb.org/3/discover/movie?api_key=096316ccf97d9bb07f660988be9d01ed&with_genres=${genre.id}`)
    xhr.send()

}

function getPrepareData({ results }) {
    return results.map((movie) => {
        return {
            title: movie.title,
            overview: movie.overview,
            backdrop_path: movie.backdrop_path
        }
    })
}

function getGenreById(id) {
    const genres = loadFromStorage(genres_key)
    return genres.find(g => g.id === id)
}

