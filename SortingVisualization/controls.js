const arrSize = 32

let vals = new Array(32)

function fillArray() {
    for (let i = 0; i < arrSize; i++) {
        vals[i] = (Math.random()*100)
    }
}

fillArray()

const selector = document.getElementById('sort-selector')

selector.onclick = () => {
    let desc = document.getElementById('info-box')
    desc.innerHTML = sortDescriptions[selector.selectedIndex]
}

selector.onclick()

const randomize = document.getElementById('randomize-btn')

randomize.onclick = () => {
    fillArray()
    highlight()
    activeSort = null
}

const sortBtn = document.getElementById('start-sort-btn')

sortBtn.onclick = () => {
    activeSort = doSort(vals, selector.selectedIndex)
}

const pauseBtn = document.getElementById('pause-btn')

pauseBtn.onclick = () => {
    activeSort = null
}

const slider = document.getElementById('speed-slider')

slider.onchange = () => {
    let interval = (101 - slider.value) * 2
    clearInterval(visArea.interval)
    visArea.interval = setInterval(updateCanvas, interval)
}