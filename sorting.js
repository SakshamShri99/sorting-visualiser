'use strict'

let barInfo = []
let ht
let barNo
let timeDelay = 2
let barObjects = []

const generateBarInfo = () => {
  barNo = Number(document.querySelector('#array-size').value)
  for (let i = 1; i < barNo + 1; i++) barInfo.push((i * 100) / barNo)
  barInfo.sort(() => Math.random() - 0.5)
}

let sortingBars = document.getElementById('sorting-bars')
generateBarInfo()
for (let i = 0; i < barNo; i++) {
  const bar = document.createElement('div')
  bar.id = `bar-${i}`
  bar.classList.add('bar')
  bar.style.height = `${barInfo[i]}%`
  bar.style.width = `${60 / 100}vw`
  sortingBars.appendChild(bar)
}
barObjects = document.getElementById('sorting-bars').childNodes

function generateBars() {
  document.getElementById('sorting-bars').innerHTML = ''
  barInfo = []
  generateBarInfo()
  for (let i = 0; i < barNo; i++) {
    const bar = document.createElement('div')
    bar.id = `bar-${i}`
    bar.classList.add('bar')
    bar.style.height = `${barInfo[i]}%`
    bar.style.width = `${60 / barNo}vw`
    sortingBars.appendChild(bar)
  }
  barObjects = document.getElementById('sorting-bars').childNodes
}

const swap = async (i, j) => {
  timeDelay = Number(document.querySelector('#time-delay').value)

  barObjects[i].style.backgroundColor = 'red'
  barObjects[i].style.backgroundColor = 'red'

  await new Promise(resolve =>
    setTimeout(() => {
      resolve()
    }, timeDelay)
  )
  const tmp1 = barInfo[i]
  const tmp2 = barInfo[j]

  barObjects[i].style.height = `${tmp2}%`
  barObjects[j].style.height = `${tmp1}%`

  barInfo[i] = tmp2
  barInfo[j] = tmp1

  barObjects[i].style.backgroundColor = 'yellow'
  barObjects[i].style.backgroundColor = 'yellow'
}

const bubbleSort = async () => {
  let i, j
  const len = barInfo.length
  let isSwapped = false

  for (i = 0; i < len; i++) {
    isSwapped = false

    for (j = 0; j < len; j++) {
      if (barInfo[j] > barInfo[j + 1]) {
        await swap(j, j + 1)
        isSwapped = true
      }
    }
    if (!isSwapped) {
      break
    }
  }
}

const partition = async (arr, start, end) => {
  const pivotValue = arr[end]
  let pivotIndex = start
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(i, pivotIndex)
      pivotIndex++
    }
  }

  await swap(pivotIndex, end)
  return pivotIndex
}

const quickSort = async () => {
  let stack = []

  stack.push(0)
  stack.push(barInfo.length - 1)

  while (stack[stack.length - 1] >= 0) {
    let end = stack.pop()
    let start = stack.pop()

    let pivotIndex = await partition(barInfo, start, end)

    if (pivotIndex - 1 > start) {
      stack.push(start)
      stack.push(pivotIndex - 1)
    }

    if (pivotIndex + 1 < end) {
      stack.push(pivotIndex + 1)
      stack.push(end)
    }
  }
}

const selectionSort = async () => {
  let n = barInfo.length

  for (let i = 0; i < n; i++) {
    let min = i
    for (let j = i + 1; j < n; j++) {
      if (barInfo[j] < barInfo[min]) {
        min = j
      }
    }
    if (min != i) {
      await swap(i, min)
    }
  }
}

const insertionSort = async () => {
  const len = barInfo.length
  for (let i = 0; i < len; i++) {
    let tmp1 = barInfo[i]
    barObjects[i].style.backgroundColor = 'red'

    let j
    for (j = i - 1; j >= 0 && barInfo[j] > tmp1; j--) {
      timeDelay = Number(document.querySelector('#time-delay').value)
      barObjects[j + 1].style.backgroundColor = 'red'
      barObjects[j].style.backgroundColor = 'red'

      await new Promise(resolve =>
        setTimeout(() => {
          resolve()
        }, timeDelay)
      )

      barObjects[j + 1].style.height = `${barInfo[j]}%`
      barInfo[j + 1] = barInfo[j]

      barObjects[j + 1].style.backgroundColor = 'yellow'
      barObjects[j].style.backgroundColor = 'yellow'
    }
    barObjects[j + 1].style.height = `${tmp1}%`
    barInfo[j + 1] = tmp1
    barObjects[i].style.backgroundColor = 'yellow'
  }
}

const mergeSort = async () => {
  let sorted = barInfo.slice(),
    n = sorted.length,
    buffer = new Array(n)

  for (let size = 1; size < n; size *= 2) {
    for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
      let left = leftStart,
        right = Math.min(left + size, n),
        leftLimit = right,
        rightLimit = Math.min(right + size, n),
        i = left
      while (left < leftLimit && right < rightLimit) {
        if (sorted[left] <= sorted[right]) {
          buffer[i++] = sorted[left++]
        } else {
          buffer[i++] = sorted[right++]
        }
      }
      while (left < leftLimit) {
        buffer[i++] = sorted[left++]
      }
      while (right < rightLimit) {
        buffer[i++] = sorted[right++]
      }
      for (let i = leftStart; i < rightLimit; i++) {
        timeDelay = Number(document.querySelector('#time-delay').value)
        barObjects[i].style.backgroundColor = 'red'
        await new Promise(resolve =>
          setTimeout(() => {
            resolve()
          }, timeDelay)
        )
        barObjects[i].style.height = `${buffer[i]}%`
        barObjects[i].style.backgroundColor = 'yellow'
      }
    }
    let temp = sorted
    sorted = buffer
    buffer = temp
  }
}

const arrayBtn = document.getElementById('array-btn')
arrayBtn.addEventListener('click', generateBars)

const barNoSlider = document.getElementById('array-size')
barNoSlider.addEventListener('input', () => {
  document.getElementById('bar-no-value').innerHTML =
    document.querySelector('#array-size').value
  generateBars()
})

const timeSlider = document.getElementById('time-delay')
timeSlider.addEventListener('input', () => {
  document.getElementById('time-value').innerHTML = `${
    document.querySelector('#time-delay').value / 5
  }ms`
})

const bubbleBtn = document.getElementById('bubble-sort')
bubbleBtn.addEventListener('click', bubbleSort)

const quickBtn = document.getElementById('quick-sort')
quickBtn.addEventListener('click', quickSort)

const selectionBtn = document.getElementById('selection-sort')
selectionBtn.addEventListener('click', selectionSort)

const insertionBtn = document.getElementById('insertion-sort')
insertionBtn.addEventListener('click', insertionSort)

const mergeBtn = document.getElementById('merge-sort')
mergeBtn.addEventListener('click', mergeSort)

window.addEventListener('resize', () => {
  document.getElementById('array-size').max = (innerWidth / 1536) * 200
  generateBars()
})
