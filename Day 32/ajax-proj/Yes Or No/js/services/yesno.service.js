'use strict'

function getAns(cb) {
    $.get('https://yesno.wtf/api', cb)
}

function getJoke (cb) {
    $.get('https://api.chucknorris.io/jokes/random', cb)
}

function getDog (cb) {
    $.get('https://dog.ceo/api/breeds/image/random',cb)
}
