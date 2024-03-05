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
  console.log(matrix)
}

button.addEventListener("click", () => {
  fieldSize = +input.value
  console.log(fieldSize)
  button.disabled = true
  input.disabled = true
  render()
})
