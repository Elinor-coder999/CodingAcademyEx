var gElCanvas
var gCtx
var gCurrShape = 'line'
var gCurrColor = 'black'
var drawing = false

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    resizeCanvas()

    gElCanvas.addEventListener('mousedown', startDrawing);
    gElCanvas.addEventListener('mouseup', stopDrawing);
    gElCanvas.addEventListener('mousemove', draw);

    document.getElementById('color-selector').addEventListener('change', (event) => {
        gCurrColor = event.target.value;
        if (gCurrColor === 'random') {
            gCurrColor = getRandomColor()
        }
    });

    document.getElementById('shape-selector').addEventListener('change', (event) => {
        gCurrShape = event.target.value;
    });


    window.addEventListener('resize', resizeCanvas)
}

function startDrawing(ev) {
    drawing = true
    onDraw(ev)
}

function stopDrawing() {
    drawing = false
    gCtx.beginPath()
}

function draw(ev) {
    if (!drawing) return;
    onDraw(ev);
}


function drawLine(x, y, xEnd = gElCanvas.width / 2, yEnd = gElCanvas.height / 2) {
    gCtx.beginPath()
    gCtx.moveTo(x, y)
    gCtx.lineTo(xEnd, yEnd)
    gCtx.lineWidth = 3
    gCtx.strokeStyle = gCurrColor
    gCtx.stroke()
}

function drawTriangle(x, y) {
    gCtx.beginPath()

    gCtx.moveTo(x, y)
    gCtx.lineTo(x + 80, y + 80)
    gCtx.lineTo(x - 20, y + 100)

    gCtx.closePath()
    gCtx.lineWidth = 2

    gCtx.fillStyle = gCurrColor
    gCtx.strokeStyle = gCurrColor
    gCtx.fill()
    gCtx.stroke()
}

function drawRect(x, y) {
    gCtx.beginPath()
    gCtx.strokeStyle = gCurrColor
    gCtx.fillStyle = gCurrColor

    gCtx.lineWidth = 3
    gCtx.rect(x, y, 120, 120)
    gCtx.fill()
    gCtx.stroke()
}


function drawArc(x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = 10
    gCtx.arc(x, y, 50, 0, Math.PI * 2)
    gCtx.fillStyle = gCurrColor
    gCtx.fill()
    gCtx.strokeStyle = gCurrColor
    gCtx.stroke()
}

function drawPencil(x, y) {
    gCtx.beginPath()
    if (!drawing) return
    gCtx.lineWidth = 5
    gCtx.arc(x, y, 1, 0, Math.PI * 2)
    gCtx.fillStyle = gCurrColor
    gCtx.fill()
    gCtx.strokeStyle = gCurrColor
    gCtx.stroke()
}

function onClearCanvas() {

    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}


function resizeCanvas() {
    gElCanvas.width = window.innerWidth
    gElCanvas.height = window.innerHeight
}

function onSetShape(shape) {
    gCurrShape = shape
    const elShapeTitle = document.querySelector('.shape-title')
    elShapeTitle.innerText = capitalize(gCurrShape)
}

function onDraw(ev) {
    const offsetX = ev.offsetX
    const offsetY = ev.offsetY

    switch (gCurrShape) {
        case 'line':
            drawLine(offsetX, offsetY)
            break
        case 'triangle':
            drawTriangle(offsetX, offsetY)
            break
        case 'rectangle':
            drawRect(offsetX, offsetY)
            break
        case 'circle':
            drawArc(offsetX, offsetY)
            break
        case 'pencil':
            drawPencil(offsetX, offsetY)
            break

    }
}

function getCanvasCenter() {
    return {
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 2
    }
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    const reader = new FileReader()

    reader.onload = (event) => {
        const img = new Image()
        img.src = event.target.result

        img.onload = () => {
            onImageReady(img)
        }
    }

    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onUploadToFB(url) {

    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
}

function onUploadImg(ev) {
    ev.preventDefault()
    const canvasData = gElCanvas.toDataURL('image/jpeg')

  
    function onSuccess(uploadedImgUrl) {
        
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
            <a href="${uploadedImgUrl}">Image Url</a>
            <p>Image url: ${uploadedImgUrl}</p>
           
            <button class="btn-facebook" target="_blank" onclick="onUploadToFB('${encodedUploadedImgUrl}')">
                Share on Facebook  
            </button>
        `
    }

    uploadImg(canvasData, onSuccess)
}



