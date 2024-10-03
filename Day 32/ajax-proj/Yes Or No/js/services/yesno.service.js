'use strict'
'use strict'

const YES_NO_URL = 'https://yesno.wtf/api'
const JOKE_URL = 'https://api.chucknorris.io/jokes/random'
const DOG_URL = 'https://dog.ceo/api/breeds/image/random'

function getAnswer(onSuccess) {
    $.get(YES_NO_URL, onSuccess)
}

function getJoke(onSuccess) {
    $.get(JOKE_URL, onSuccess)
}

function getDog(onSuccess) {
    $.get(DOG_URL, (res) => onSuccess(res.message))
}
