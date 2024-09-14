'use strict'

var gBooks = [
   { id:'bg4J78', title: 'The adventures of Lori Ipsi', price: 120, imgUrl: 'lori-ipsi.jpg'},
   { id:'bg4J79', title: 'World Atlas', price: 300, imgUrl: 'world-atlas.jpg'},
   { id:'bg4J80', title: 'Zora The Greek', price: 87, imgUrl: 'zore-the-greek.jpg'} 
]

function getBooks(){
    return gBooks
}

function getBooksById(bookId){
    return gBooks.find(book => book.id === bookId)
}

function removeBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
}

function updatePrice(bookId, UpdatePrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = UpdatePrice
}

function addBook() {
    const book = {
        id: makeId(),
        title: newTitle,
        price: newPrice,
        imgUrl: newTitle + '.jpg'
    }
    gBooks.unshift(book)  
}
