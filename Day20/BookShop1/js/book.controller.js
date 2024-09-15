'use strict'

const gQueryOptions = {
    filterBy: { txt: '', rating: 0 },
    sortBy: { sortField: '', sortDir: 1 },
    page: { idx: 0, size: 5 },
}

function onInit() {
    readQueryParams()
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
    setQueryParams()
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

function onSetSortBy() {
    const elSortField = document.querySelector('.sort-by .sort-field')
    const elSortDir = document.querySelector('.sort-by .sort-dir')    
    
    gQueryOptions.sortBy.sortField = elSortField.value
    gQueryOptions.sortBy.sortDir = elSortDir.checked ? -1 : 1
    
    gQueryOptions.page.idx = 0
    renderBooksTable()
}

function onClearFilter() {
    const elTitle = document.querySelector('.filter-by .title')
    const elRating = document.querySelector('.filter-by .rating')  
    elTitle.value = ''
    elRating.value = ''

    renderBooksTable()
}

function renderQueryParams() {
    
    document.querySelector('.title').value = gQueryOptions.filterBy.txt
    document.querySelector('.rating').value = gQueryOptions.filterBy.rating
    
    const sortField = gQueryOptions.sortBy.sortField
    const sortDir = +gQueryOptions.sortBy.sortDir

    document.querySelector('.sort-by select').value = sortField || ''
    document.querySelector('.sort-by input').checked = (sortDir === -1) ? true : false
}

function setQueryParams() {
    const queryParams = new URLSearchParams()

    queryParams.set('title', gQueryOptions.filterBy.txt)
    queryParams.set('rating', gQueryOptions.filterBy.rating)

    if(gQueryOptions.sortBy.sortField) {
        queryParams.set('sortField', gQueryOptions.sortBy.sortField)
        queryParams.set('sortDir', gQueryOptions.sortBy.sortDir)
    }

    if(gQueryOptions.page) {
        queryParams.set('pageIdx', gQueryOptions.page.idx)
        queryParams.set('pageSize', gQueryOptions.page.size)
    }

    const newUrl = 
        window.location.protocol + "//" + 
        window.location.host + 
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)
}

function readQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)
    
    gQueryOptions.filterBy = {
        txt: queryParams.get('title') || '',
        rating: +queryParams.get('rating') || 0
    }

    if(queryParams.get('sortField')) {
        const prop = queryParams.get('sortField')
        const dir = queryParams.get('sortDir')

        gQueryOptions.sortBy.sortField = prop
        gQueryOptions.sortBy.sortDir = dir
    }

    if(queryParams.get('pageIdx')) {
        gQueryOptions.page.idx = +queryParams.get('pageIdx')
        gQueryOptions.page.size = +queryParams.get('pageSize')
    }
    renderQueryParams()
}

