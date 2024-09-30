'use strict'

function getData(rows, cb) {
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText)
            cb(data)
        }
    }


    xhr.open('GET', `http://filltext.com/?rows=${rows}&fname={firstName}&lname={lastName}&tel={phone|format}&address={addressObject}`, true)
    xhr.send()
}