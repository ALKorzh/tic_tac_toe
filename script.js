const button = document.querySelector("#set-field-size")
const input = document.querySelector("#input-field-size")
const matrixEl = document.querySelector("#table")
const output = document.querySelector(".output")

let matrix = []
let fieldSize
const playersSymbols = ["O", "X"]
const playerSymbolValues = [-1, 1]
let moveCounter = 0

function createMatrix(fieldSize) {
  matrix = Array.from(
    { length: fieldSize },
    (el) => (el = Array.from({ length: fieldSize }, (i) => (i = 0)))
  )
}

function render() {
  createMatrix(fieldSize)
  let idCounter = 1
  matrix.forEach((row) => {
    matrixEl.innerHTML += "<div id='row'></div>"
    row.forEach(() => {
      matrixEl.lastChild.innerHTML += `<div class='cell' id='cell-${idCounter}'></div>`
      idCounter++
    })
  })

  document.querySelectorAll(".cell").forEach((cell) => {
    cell.addEventListener("click", updateCellAndMatrix)
  })
}

function updateCellAndMatrix() {
  moveCounter++
  this.innerHTML = `<p>${
    playersSymbols[moveCounter % playersSymbols.length]
  }</p>`
  this.removeEventListener("click", updateCellAndMatrix)

  let numberOfCell = this.id.match(/\d+/g)[0]
  let placeCounter = 0
  matrix.forEach((row) => {
    row.forEach((el, i) => {
      placeCounter++
      if (placeCounter == numberOfCell) {
        row[i] = playerSymbolValues[moveCounter % playerSymbolValues.length]
      }
    })
  })

  if (isWinningBoard(matrix)) {
    document.querySelectorAll(".cell").forEach((cell) => {
      cell.removeEventListener("click", updateCellAndMatrix)
    })
    showWinMessage()
    return null
  } else {
    if (isFilledField(matrix)) {
      showDrawMessage()
      return null
    }
  }
  respondOnEvent()
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
    let rowSum = row.reduce((sum, current) => {
      return sum + current
    })
    if (
      rowSum ==
      playerSymbolValues[moveCounter % playerSymbolValues.length] * fieldSize
    ) {
      flag = true
    }
  })
  return flag
}

function isWinningBoard() {
  return (
    isWinRow(matrix, fieldSize) ||
    isWinRow(transpose(matrix), fieldSize) ||
    isWinRow(findMainSecondaryDiagonals(matrix), fieldSize)
  )
}

function respondOnEvent() {
  output.innerHTML += "<div class='message'></div>"
  let messages = document.querySelectorAll(".message")
  messages[messages.length - 1].innerHTML += `<p>Ход ${
    moveCounter + 1
  } - ходит ${playersSymbols[(moveCounter + 1) % playersSymbols.length]}</p>`
  output.style.height = `${document.querySelector("#table").offsetHeight}px`
}

function showWinMessage() {
  let messages = document.querySelectorAll(".message")
  messages[messages.length - 1].innerHTML += `<p>Победил ${
    playersSymbols[moveCounter % playersSymbols.length]
  }. На ${moveCounter} ходу</p>`
  messages[messages.length - 1].lastChild.style.color = "green"
}

function showDrawMessage() {
  let messages = document.querySelectorAll(".message")
  messages[
    messages.length - 1
  ].innerHTML += `<p>Ничья. На ${moveCounter} ходу</p>`
}

function isFilledField(matrix) {
  let flag = false
  matrix.forEach((row) => {
    if (!row.includes(0)) {
      flag = true
    }
  })
  return flag
}

button.addEventListener("click", () => {
  fieldSize = +input.value
  button.disabled = true
  input.disabled = true
  render()
  respondOnEvent()
})
