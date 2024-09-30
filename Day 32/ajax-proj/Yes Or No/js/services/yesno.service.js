'use strict'

function getAns(cb) {
    const xhr = new XMLHttpRequest()

    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            const ans = JSON.parse(xhr.responseText)
            cb(ans)
        }
    }
    xhr.open('GET', 'https://yesno.wtf/api', true)
    xhr.send()
}
