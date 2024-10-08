'use strict'

const BOOKS_KEY = 'books'

var gBooks = []

_createBooks()

function getBooks(options = {}) {
    const filterBy = options.filterBy
    const sortBy = options.sortBy  || { sortField: 'title', sortDir: 1 }
    const page = options.page || { idx: 0, size: 10 }

    var books = _filterBooks(filterBy)
    if(sortBy.sortField === 'price') {
       books.sort((b1, b2) => b1.price.localeCompare(b2.price) * sortBy.sortDir)
    } else if(sortBy.sortField === 'rating'){
        books.sort((b1, b2) => (b1.rating - b2.rating) * sortBy.sortDir)
    }

    const startIdx = page.idx * page.size
    console.log(page.idx, startIdx)
    books = books.slice(startIdx, startIdx + page.size)

    return books
}

function getBooksById(bookId) {
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

function _createBooks() {
    gBooks = loadFromStorage(BOOKS_KEY)
    if (gBooks && gBooks.length !== 0) return
    gBooks = []
    gBooks.push(_createBook('The Handmaid Tale', 120, 'img/handmaid.jpg'))
    gBooks.push(_createBook('Harry Potter & The Goblet of Fire', 150, 'img/harry potter.jpg'))
    gBooks.push(_createBook('The Hunger Games', 81, 'img/hungergames.jpg'))


    _saveBooks()
}

function _createBook(title, price, imgUrl) {
    return {
        id: makeId(),
        title,
        price,
        imgUrl: imgUrl || 'img/No_Image_Available.jpg',
        rating: getRandomInt(1, 5)
    }
}

function _saveBooks() {
    saveToStorage(BOOKS_KEY, gBooks)
}

function _filterBooks(filterBy){
    var books = gBooks.slice()

    if(filterBy.txt){
        const regex = new RegExp(filterBy.txt,'i')
        books = books.filter(book => regex.test(book.title))
    }
    if(filterBy.rating){
        books = books.filter(book => book.rating >= filterBy.rating)
    }
    return books
}