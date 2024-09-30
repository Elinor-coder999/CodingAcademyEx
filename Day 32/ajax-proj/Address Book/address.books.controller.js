'use strict'
function onInIt(){
console.log('hey');

}

function onGetCards(value){
   hideCards()
   getData(value, renderCard)
    
}

function renderCard(data){
    if (!data) {
        console.log('no data')
        return
    }

    const elCardsContainer = document.querySelector('.cards-container')
    const strHtmls = data.map(person => `<div class="card">
        <li class="full-name">${person.fname},${person.lname}</li>
        <li class="phone" >Phone: ${person.tel}</li>
        <li class="city">City: ${person.address.city}</li>
        <li class="state">State: ${person.address.state}</li>
        <li class="zip">Zip: ${person.address.zip}</li>
        <li class="address">Address: ${person.address.streetAddress}</li>
        <img onload="onShowCards()" class="robot" src="https://robohash.org/${person.address.zip}"  >
    </div>` )

    elCardsContainer.innerHTML = strHtmls.join('')
}

function onShowCards(){
    const elCardsContainer = document.querySelector('.cards-container')
    elCardsContainer.classList.remove('hidden')
}

function hideCards(){
    const elCardsContainer = document.querySelector('.cards-container')
    elCardsContainer.classList.add('hidden')
}