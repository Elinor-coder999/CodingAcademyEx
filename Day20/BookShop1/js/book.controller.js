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
                <button class="update" onclick="onUpdateBook('${book.id}')">Update</button>
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

function onUpdateBook(bookId){
    const UpdatePrice = +prompt('Enter the new price')
    updatePrice(bookId, UpdatePrice) 
}

function updatePrice(bookId, UpdatePrice) {
   const book = gBooks.find(book=>book.id === bookId)
    book.price = UpdatePrice
    renderBooksTable()
}

function onAddBook (){
   const newTitle = prompt ('Enter the title of the book')
   const newPrice = prompt ('Enter the price of the book')
   const book = {
    id: 'b' + Date.now % 1000,
    title: newTitle,
    price: newPrice,
    imgUrl:newTitle +'.jpg'
   }
   gBooks.unshift(book)
   renderBooksTable()
}