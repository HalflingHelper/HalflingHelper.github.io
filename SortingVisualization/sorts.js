function highlight(n1=-1, n2=-1, col='#0000FF') {
    highlight1 = n1
    highlight2 = n2
    highlightCol = col
}

let activeSort = null

//This can get changed to looking up the function in an array
//The values also have to be manually matched to the ones in html which sucks
function doSort(arr, sortId) {
    switch (sortId) {
        case 0:
            return selectionSort(arr)
        case 1:
            return mergeSort(arr)
        case 2:
            return quickSort(arr)
        case 3:
            return bubbleSort(arr)
        default:
            return
    }
}

//Quick Sort with right value as the pivot
// I'm not sure if this is a legit quick sort, I might be cheating a tiny bit
function* quickSort(arr, start = 0, end=null, depth=0) {
    // console.log(start + '   ' + end)
    depth++
    console.log(depth)
    if (depth > 400) return
    end = end ? end : arr.length-1
    if (end-start < 1) return

    let pivotIndex = end
    let pivot = arr[end]
    
    for (let i = start; i <= pivotIndex; i++) {
        if (arr[i] > pivot) {
            let temp = arr[i]
            arr.splice(end+1, 0, temp)
            pivotIndex--
            highlight(i, pivotIndex)
            arr.splice(i, 1)
            i--
            yield
        }
    }

    let sub = quickSort(arr, start, pivotIndex - 1, depth)
    while (!sub.next().done) {
        yield
    }

    sub = quickSort(arr, pivotIndex, end, depth)
    console.log('a')
    while (!sub.next().done) {
        yield
    }

    highlight()
    return

}

function* bubbleSort(arr) {
    let swapped = true
    while (swapped) {
        swapped = false
        for (let i = 0; i < arr.length - 1; i++) {
            //If I implement highlighting comparisions
            
            if (arr[i + 1] < arr[i]) {
                swapped = true
                let temp = arr[i]
                arr[i] = arr[i + 1]
                arr[i + 1] = temp
                //Yield on swap for purposes of visualization
                //Highlight in a different color
                highlight(i, i + 1, '#00FF00')
                yield
            } else {
                highlight(i, i+1)
                yield
            }
        }
    }
    activeSort = null
    return
}

function* selectionSort(arr) {
    let min = 101
    let minIndex = -1
    for (let i = 0; i < arr.length - 1; i++) {
        min = 101
        minIndex = -1
        //Highlight here
        
        //yield
        for (let j = i; j < arr.length; j++) {
            highlight(j, minIndex)
            yield
            if (arr[j] < min) {
                minIndex = j
                min = arr[j]

            }
        }
        if (minIndex > i) {
            arr[minIndex] = arr[i]
            arr[i] = min
            //Return after the swap
            highlight(i, -1)
            yield
        }
    }
    activeSort = null
    return
}

function* mergeSort(arr) {
    let step = 2;
    while (step < arr.length * 2) {
        //Start Points - Every 2nd val, every 4th value, ...
        for (let i = 0; i < arr.length; i += step) {
            //Checking Each Pair
            let size = step / 2;
            let j = i

            while (j < step + i) {
                if (j >= arr.length || j + size >= i + step)
                    break
                let temp = arr[size + j]
                //Comparision is here
                highlight(size+j, j)
                yield
                if (temp < arr[j]) {
                    arr.splice(size + j, 1)
                    arr.splice(j, 0, temp)
                    j++
                } else {
                    j++
                    size = size > 1 ? size - 1 : size
                }
            }
        }
        step *= 2
    }
    highlight()
    return

}