'use strict'

function onInit() {
    getGenres(renderGenres)
}

function renderGenres(genres) {
    console.log('genres:', genres)
    const strHTMLs = genres.map((genre) =>
        `<button onclick="onGetMoviesByGenre(${genre.id})" class="btn">${genre.name}</button>`
    )
    document.querySelector('.genres').innerHTML = strHTMLs.join('')
}

function onGetMoviesByGenre(genreId) {
    getMoviesByGenre(genreId, renderMoviesByGenre)
}

function renderMoviesByGenre(movies) {
    const strHTMLs = movies.map(({ title, overview, backdrop_path }) => `
            <article class="card">
                <div class="card-img-con">
                <img src="https://image.tmdb.org/t/p/w500${backdrop_path}" alt="${title} poster"/>
                </div>
                <div class="venue">${title}</div>
                <div class="location">${overview}</div>
            </article>
        `
    )
    document.querySelector('.movies').innerHTML = strHTMLs.join('')
}
