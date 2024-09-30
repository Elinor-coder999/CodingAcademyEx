'use strict'

function onAsk() {
    hideAns()
    getAns(renderAns)
}

function renderAns(ans) {
    const elAns = document.querySelector('.answer h2')
    elAns.innerText = ans.answer

    const elImg = document.querySelector('.answer img')
    elImg.src = ans.image   // Generate another network request fot the image
}

function showAns() {
    const elAns = document.querySelector('.answer')
    elAns.classList.remove('hidden')
    
    const elLoader = document.querySelector('.loader')
    elLoader.classList.add('hidden')
}

function hideAns() {
    const elAns = document.querySelector('.answer')
    elAns.classList.add('hidden')
    
    const elLoader = document.querySelector('.loader')
    elLoader.classList.remove('hidden')
}