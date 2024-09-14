'use strict'

const BOOKS_KEY = 'books'

var gBooks = []

_createBooks()



function getBooks(){
    return gBooks
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

function addBook() {
    const book = _createBook(title, price)
    gBooks.unshift(book)  
    _saveBooks()
}

function _createBooks(){
    gBooks = loadFromStorage(BOOKS_KEY)
    if (gBooks && gBooks.length !== 0) return
    gBooks = []
    gBooks.push(_createBook('The adventures of Lori Ipsi', 120))

    _saveBooks()
}

function _createBook(title, price){
    return  {
        id: makeId(),
        title,
        price,
        imgUrl: title +'.jpg'
    }
}

function _saveBooks(){
    saveToStorage(BOOKS_KEY,gBooks)
}