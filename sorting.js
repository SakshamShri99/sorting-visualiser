'use strict'

let barInfo = []
let ht
let barNo
let timeDelay = 2

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

function generateBars() {
  document.getElementById('sorting-bars').innerHTML = ''
  barInfo = []
  generateBarInfo()
  console.log(barInfo)
  for (let i = 0; i < barNo; i++) {
    const bar = document.createElement('div')
    bar.id = `bar-${i}`
    bar.classList.add('bar')
    bar.style.height = `${barInfo[i]}%`
    bar.style.width = `${60 / barNo}vw`
    sortingBars.appendChild(bar)
  }
}

const swap = async (i, j) => {
  timeDelay = Number(document.querySelector('#time-delay').value)

  document.getElementById(`bar-${i}`).style.backgroundColor = 'red'
  document.getElementById(`bar-${j}`).style.backgroundColor = 'red'

  await new Promise(resolve =>
    setTimeout(() => {
      resolve()
    }, timeDelay)
  )
  const tmp1 = barInfo[i]
  const tmp2 = barInfo[j]

  document.getElementById(`bar-${i}`).style.height = `${tmp2}%`
  document.getElementById(`bar-${j}`).style.height = `${tmp1}%`

  barInfo[i] = tmp2
  barInfo[j] = tmp1

  document.getElementById(`bar-${i}`).style.backgroundColor = 'yellow'
  document.getElementById(`bar-${j}`).style.backgroundColor = 'yellow'
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
  timeDelay = Number(document.querySelector('#time-delay').value)

  const len = barInfo.length
  for (let i = 0; i < len; i++) {
    let tmp1 = barInfo[i]
    document.getElementById(`bar-${i}`).style.backgroundColor = 'red'

    let j
    for (j = i - 1; j >= 0 && barInfo[j] > tmp1; j--) {
      document.getElementById(`bar-${j + 1}`).style.backgroundColor = 'red'
      document.getElementById(`bar-${j}`).style.backgroundColor = 'red'

      await new Promise(resolve =>
        setTimeout(() => {
          resolve()
        }, timeDelay)
      )

      document.getElementById(`bar-${j + 1}`).style.height = `${barInfo[j]}%`
      barInfo[j + 1] = barInfo[j]

      document.getElementById(`bar-${j + 1}`).style.backgroundColor = 'yellow'
      document.getElementById(`bar-${j}`).style.backgroundColor = 'yellow'
    }
    document.getElementById(`bar-${j + 1}`).style.height = `${tmp1}%`
    barInfo[j + 1] = tmp1
    document.getElementById(`bar-${i}`).style.backgroundColor = 'yellow'
  }
}

// const merge = async (arr1, arr2, barInfo) => {
//   let result = []
//   let i = 0
//   let j = 0

//   while (i < arr1.length && j < arr2.length) {
//     document.getElementById(
//       `bar-${barInfo.indexOf(arr1[i])}`
//     ).style.backgroundColor = 'red'
//     document.getElementById(
//       `bar-${barInfo.indexOf(arr2[j])}`
//     ).style.backgroundColor = 'red'
//     if (arr1[i] > arr2[j]) {
//       document.getElementById(
//         `bar-${barInfo.indexOf(arr1[i])}`
//       ).style.height = `${tmp2}%`
//       document.getElementById(
//         `bar-${barInfo.indexOf(arr2[j])}`
//       ).style.height = `${tmp1}%`
//       result.push(arr2[j])
//       j++
//     } else {
//       result.push(arr1[i])
//       i++
//     }
//     document.getElementById(
//       `bar-${barInfo.indexOf(arr1[i])}`
//     ).style.backgroundColor = 'yellow'
//     document.getElementById(
//       `bar-${barInfo.indexOf(arr2[j])}`
//     ).style.backgroundColor = 'yellow'
//   }

//   while (i < arr1.length) {
//     result.push(arr1[i])
//     i++
//   }

//   while (j < arr2.length) {
//     result.push(arr2[j])
//     j++
//   }
//   return result
// }

// const mergeSort = (arr = barInfo, arrInfo = barInfo) => {
//   if (arr.length <= 1) return arr

//   let halfPoint = Math.ceil(arr.length / 2)

//   let firstHalf = mergeSort(arr.splice(0, halfPoint))

//   let secondHalf = mergeSort(arr.splice(-halfPoint))

//   return merge(firstHalf, secondHalf, arrInfo)
// }

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
  document.getElementById('time-value').innerHTML =
    document.querySelector('#time-delay').value / 5
})

const bubbleBtn = document.getElementById('bubble-sort')
bubbleBtn.addEventListener('click', bubbleSort)

const quickBtn = document.getElementById('quick-sort')
quickBtn.addEventListener('click', quickSort)

const selectionBtn = document.getElementById('selection-sort')
selectionBtn.addEventListener('click', selectionSort)

const insertionBtn = document.getElementById('insertion-sort')
insertionBtn.addEventListener('click', insertionSort)

// const mergeBtn = document.getElementById('merge-sort')
// mergeBtn.addEventListener('click', () => {
//   mergeSort()
// })
