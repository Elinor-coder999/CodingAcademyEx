'use strict'

const BOOKS_KEY = 'books'

var gBooks = []

_createBooks()

function getBooks(filterBy){
   if (!filterBy) return gBooks
   const filteredBooks = findBooksByTitle(filterBy)
   return filteredBooks
}

function getBooksById(bookId){
    return gBooks.find(book => book.id === bookId)
}

function removeBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
    _saveBooks()

}

function updatePrice(bookId, UpdatePrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price = UpdatePrice
    _saveBooks()

}

function addBook(title, price) {
    const book = _createBook(title, price)
    gBooks.unshift(book)  
    _saveBooks()
}

function _createBooks(){
    gBooks = loadFromStorage(BOOKS_KEY)
    if (gBooks && gBooks.length !== 0) return
    gBooks = []
    gBooks.push(_createBook('The Handmaid Tale', 120, 'img/handmaid.jpg'))
    gBooks.push(_createBook('Harry Potter & The Goblet of Fire', 150, 'img/harry potter.jpg'))
    gBooks.push(_createBook('The Hunger Games', 81, 'img/hungergames.jpg'))


    _saveBooks()
}

function _createBook(title, price, imgUrl){
    return  {
        id: makeId(),
        title,
        price,
        imgUrl: imgUrl || 'img/No_Image_Available.jpg',
        rating: getRandomInt(1, 6)
    }
}

function _saveBooks(){
    saveToStorage(BOOKS_KEY,gBooks)
}

function findBooksByTitle(filterBy){
    const txt = filterBy.toLowerCase()
    return gBooks.filter(book => book.title.toLowerCase().includes(txt))
}