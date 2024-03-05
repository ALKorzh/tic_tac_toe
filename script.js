const button = document.querySelector("#set-field-size")
const input = document.querySelector("#input-field-size")
const matrixEl = document.querySelector("#table")

let matrix = []
let fieldSize
const playersSymbols = ["O", "X"]
const playersNumbersOfSymbols = [-1, 1]
let moveCounter = 0

function createMatrix(fieldSize) {
  matrix = Array.from(
    { length: fieldSize },
    (el) => (el = Array.from({ length: fieldSize }, (i) => (i = 0)))
  )
  console.log(matrix)
}

function render() {
  createMatrix(fieldSize)
  let idCounter = 1
  matrix.forEach((row) => {
    matrixEl.innerHTML += "<div id='row'></div>"
    console.log(row)
    row.forEach(() => {
      matrixEl.lastChild.innerHTML += `<div class='cell' id='cell-${idCounter}'></div>`
      idCounter++
    })
  })

  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", fillCell)
  })
}

function fillCell() {
  moveCounter++
  this.innerHTML = `<p>${
    playersSymbols[moveCounter % playersSymbols.length]
  }</p>`
  this.removeEventListener("click", fillCell)

  let numberOfCell = this.id.match(/\d+/g)[0]
  let placeCounter = 0
  matrix.forEach((row) => {
    row.forEach((el, i) => {
      placeCounter++
      if (placeCounter == numberOfCell) {
        row[i] =
          playersNumbersOfSymbols[moveCounter % playersNumbersOfSymbols.length]
      }
    })
  })
  console.log(isWinField(matrix))
  console.log(matrix)
  if (isWinField(matrix)) {
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.removeEventListener("click", fillCell)
    })
  }
}
function transpose(matrix) {
  return matrix[0].map((col, i) => {
    return matrix.map((row) => {
      return row[i]
    })
  })
}
function findMainSecondaryDiagonals(matrix) {
  const mainDiagonal = matrix.map((row, i) => row[i])
  const secondaryDiagonal = matrix.map((row, i) => row[row.length - i - 1])
  return (diagonals = [mainDiagonal, secondaryDiagonal])
}
function isWinRow(matrix, fieldSize) {
  let flag = false
  matrix.forEach((row) => {
    console.log(row)
    let rowSum = row.reduce((sum, current) => {
      return sum + current
    })
    console.log(rowSum)
    if (
      rowSum ==
      playersNumbersOfSymbols[moveCounter % playersNumbersOfSymbols.length] *
        fieldSize
    ) {
      flag = true
    }
  })
  return flag
}
function isWinField() {
  return (
    isWinRow(matrix, fieldSize) ||
    isWinRow(transpose(matrix), fieldSize) ||
    isWinRow(findMainSecondaryDiagonals(matrix), fieldSize)
  )
}
button.addEventListener("click", () => {
  fieldSize = +input.value
  console.log(fieldSize)
  button.disabled = true
  input.disabled = true
  render()
})
