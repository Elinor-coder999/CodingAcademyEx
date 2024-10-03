'use strict'

function onQuestionAsked(ev) {
    ev.preventDefault()
    getAnswer(renderAnswer)
}

function renderAnswer({ answer, image }) {
    const strHTML = `
        <h1>${answer}<h1>
        <img src=${image}
    `
    document.querySelector('.answer-container').innerHTML = strHTML

    if (answer === 'yes') getJoke(renderJoke)
        else getDog(renderDog)
}

function renderJoke ({value}){
    document.querySelector('.joke-or-dog').innerHTML = `<h1>${value}<h1>`
}

function renderDog(imgUrl){
    document.querySelector('.joke-or-dog').innerHTML = `<img src="${imgUrl}">`
}