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
                <button class="update">Update</button>
                <button class="delete" onclick="onRemoveBook('${book.id}')">Delete</button>
                </td>
            </tr>`)

    elBooksTable.innerHTML = strHtmls.join('')
}

function onRemoveBook(bookId) {
   const idx = gBooks.findIndex(book => book.id === bookId)
   gBooks.splice(idx,1)
   renderBooksTable()
}
