var highlight1 = -1
var highlight2 = -1
var highlightCol = '#0000FF'

const barWidth = 16;
const canvasHeight = 200

var visArea = {
    canvas: document.getElementById('data-vis'),
    start: function () {
        this.canvas.width = (arrSize + 2) * (barWidth + 1)
        this.canvas.height = canvasHeight
        this.ctx = this.canvas.getContext("2d");
        this.interval = setInterval(updateCanvas, 102);
    },
    clear: function () {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

visArea.start()

function updateCanvas() {
    if (activeSort != null) {
        activeSort.next();
    }

    visArea.clear()


    vals.forEach((element, i) => {
        if (i == highlight1 || i == highlight2)
            visArea.ctx.fillStyle = highlightCol
        else
            visArea.ctx.fillStyle = "#FF0000"

        visArea.ctx.fillRect((i + 1) * (barWidth + 1), canvasHeight - element, barWidth, element);
    });
}