'use strict'

function onInit() {

    renderBooksTable()
}


function renderBooksTable() {

    const elBooksTable = document.querySelector('.books.table')
    const strHtmls = gBooks.map(book =>
        `   <tr>
                <td>${book.title}</td>
                <td>${book.price}</td>
                <td>
                <button class="read">Read</button>
                <button class="update" onclick="onUpdateBook(event,'${book.id}')">Update</button>
                <button class="delete" onclick="onRemoveBook(event,'${book.id}')">Delete</button>
                 <button class="details" onclick="onShowBookDetails(event, '${book.id}')"> Details</button>
                </td>
            </tr>`)

    elBooksTable.innerHTML = strHtmls.join('')
}

function onRemoveBook(bookId) {
    const idx = gBooks.findIndex(book => book.id === bookId)
    //MODEL
    gBooks.splice(idx, 1)
    //DOM
    renderBooksTable()
}

function onUpdateBook(ev, bookId) {
    ev.stopPropagation()
    const UpdatePrice = +prompt('Enter the new price')
    updatePrice(bookId, UpdatePrice)
}

function updatePrice(bookId, UpdatePrice) {
    const book = gBooks.find(book => book.id === bookId)
    //MODEL
    book.price = UpdatePrice
    //DOM
    renderBooksTable()
}

function onAddBook() {
    const newTitle = prompt('Enter the title of the book')
    const newPrice = prompt('Enter the price of the book')

    //MODEL
    const book = {
        id: 'b' + Date.now % 1000,
        title: newTitle,
        price: newPrice,
        imgUrl: newTitle + '.jpg'
    }
    gBooks.unshift(book)
    //DOM
    renderBooksTable()
}

function onShowBookDetails(ev, bookId) {
    ev.stopPropagation()
    const elModal = document.querySelector('.details-modal')
    const elDetails = document.querySelector('pre')
    

    const book = getBooksById(bookId)
    const bookJson = JSON.stringify(book,null,2)

    elDetails.innerText = bookJson
    elModal.classList.remove('hidden') 
}




