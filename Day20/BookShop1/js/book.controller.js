'use strict'
// var gFilterby = ''

const gQueryOptions = {
    filterBy: { txt: '', rating: 0 },
    sortBy: {},
    page: { idx: 0, size: 5 },
}

function onInit() {
    renderBooksTable()
}


function renderBooksTable() {
    const elBooksTable = document.querySelector('.books.table')
    const books = getBooks(gQueryOptions)

    if (books.length === 0) {
        const elNoResults = document.querySelector('.no-results')
        elNoResults.classList.remove('hidden')
    }else{
        const elNoResults = document.querySelector('.no-results')
        elNoResults.classList.add('hidden')
    }

    const strHtmls = books.map(book =>
        `   <tr>
             <td>${book.title}</td>
                <td>${book.price}</td>
                <td>${book.rating}</td>
                <td>
                    <button class="read">Read</button>
                    <button class="update" onclick="onUpdateBook(event,'${book.id}')">Update</button>
                    <button class="delete" onclick="onRemoveBook(event,'${book.id}')">Delete</button>
                    <button class="details" onclick="onShowBookDetails(event, '${book.id}')"> Details</button>
                </td>
            </tr>`)

    elBooksTable.innerHTML = strHtmls.join('')
}

function onRemoveBook(ev, bookId) {
    ev.stopPropagation()
    removeBook(bookId)
    renderBooksTable()
}

function onUpdateBook(ev, bookId) {
    ev.stopPropagation()
    const UpdatePrice = +prompt('Enter the new price')
    updatePrice(bookId, UpdatePrice)
    renderBooksTable()
}

function onAddBook() {
    const newTitle = prompt('Enter the title of the book')
    const newPrice = prompt('Enter the price of the book')
    addBook(newTitle, newPrice)
    renderBooksTable()
}

function onShowBookDetails(ev, bookId) {
    ev.stopPropagation()
    const elModal = document.querySelector('.details-modal')
    const book = getBooksById(bookId)
    const elDetails = document.querySelector('pre')
    elDetails.innerText = `
        id:${bookId},
        title:${book.title}'
        price:${book.price},
        rating:${book.rating}
    `
    const elImg = document.querySelector('.book-img img')
    elImg.src = book.imgUrl
    elModal.classList.remove('hidden')
}

function onCloseModal() {
    const elModal = document.querySelector('.details-modal')
    elModal.classList.add('hidden')
}

function onSetFilterBy() {
    const elTitle = document.querySelector('.filter-by .title')
    const elRating = document.querySelector('.filter-by .rating')
  
    gQueryOptions.filterBy.txt = elTitle.value
    gQueryOptions.filterBy.rating = +elRating.value
  
     renderBooksTable()
}

function onClearFilter() {
    const elTitle = document.querySelector('.filter-by .title')
    const elRating = document.querySelector('.filter-by .rating')  
    elTitle.value = ''
    elRating.value = ''

    renderBooksTable()
}

