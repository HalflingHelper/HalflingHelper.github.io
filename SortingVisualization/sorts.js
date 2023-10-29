function highlight(n1 = -1, n2 = -1, col = '#0000FF') {
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
        case 4:
            return heapSort(arr)
        case 5: 
            return gnomeSort(arr)
        default:
            return
    }
}

// Quick Sort with right value as the pivot
// I'm not sure if this is a legit quick sort, I might be cheating a tiny bit
function* quickSort(arr, start = 0, end = null, depth = 0) {
    // console.log(start + '   ' + end)
    depth++
    console.log(depth)
    if (depth > 400) return
    end = end ? end : arr.length - 1
    if (end - start < 1) return

    let pivotIndex = end
    let pivot = arr[end]

    for (let i = start; i <= pivotIndex; i++) {
        if (arr[i] > pivot) {
            let temp = arr[i]
            arr.splice(end + 1, 0, temp)
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
                highlight(i, i + 1)
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
                highlight(size + j, j)
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

// Helpers for heap sort
left = idx => idx * 2 + 1;
right = idx => idx * 2 + 2;

function* heapSort(arr) {
    // Heapify the array
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
        let largest = i;

        // Make sure we still have chilren
        while (left(largest) < arr.length) {
            let root = largest
            // Left child is greater
            if (arr[left(root)] > arr[largest]) {
                largest = left(root)
            }
            // Right child exists and is greater
            if (right(root) < arr.length && arr[right(root)] > arr[largest]) {
                largest = right(root)
            }

            if (largest === root) break;
            // Do the swap and highlight
            //TODO: Cut this out of the loop so we only have to do one swap
            let temp = arr[root]
            arr[root] = arr[largest]
            arr[largest] = temp

            highlight(root, largest)
            yield
        }
    }

    let end = arr.length - 1

    // Continually pull the highest element from the heap
    while (end > 0) {
        temp = arr[end]
        arr[end] = arr[0]
        arr[0] = temp

        highlight(0, end)
        yield

        end--

        // Heapify starting at 0
        let curr = 0;
        while (left(curr) <= end) {
            root = curr

            if (arr[left(root)] > arr[curr]) {
                curr = left(root)
            }

            // Right child exists and is greater
            if (right(root) <= end && arr[right(root)] > arr[curr]) {
                curr = right(root)
            }

            if (curr === root) break;
            // Do the swap and highlight
            //TODO: Cut this out of the loop so we only have to do one swap
            let temp = arr[root]
            arr[root] = arr[curr]
            arr[curr] = temp

            highlight(root, curr)
            yield
        }
    }
    highlight()
    return
}

function* gnomeSort(arr) {

    let i = 0;
    while (i < arr.length) {
        if (i == 0 || arr[i] > arr[i-1]) {
            i++;
            highlight(i, i-1, "green")
            yield
        } else {
            let tmp = arr[i];
            arr[i] = arr[i-1]
            arr[i-1] = tmp;
            highlight(i, i-1, "blue")
            yield
            i--
        }
    }


    highlight()
    return
}