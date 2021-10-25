let boardSize = [4, 4]
let board;
let logica = []
let positionNull;

window.onload = () => {
    board = document.getElementById("board");
    init()
}

function init() {

    if(confirm("Deseja alterar o nivel?")) {
        let level = prompt("Qual o nível? 4-10")
        if(level < 4 || level > 10) {
            alert('Opção inserida não permitida')
            window.location.reload()
        }
        boardSize[0] = level
        boardSize[1] = level
    }

    positionNull = [Math.floor(Math.random() * (boardSize[0] - 1)) + 1, Math.floor(Math.random() * (boardSize[1] - 1)) + 1]
    console.log(positionNull)

    let listaNumeros = []
    for(i = 1; i <= (boardSize[0] * boardSize[1] - 1); i++) {
        listaNumeros.push(i)
    }
    listaNumeros.sort(() => .5 - Math.random())

    logica = []
    for(i = 0; i < boardSize[0]; i++) {
        line = []
        for(j = 0; j < boardSize[1]; j++) {
            line.push(null)
        }
        logica.push(line)
    }
    for(i = 0; i < boardSize[0]; i++) {
        for(j = 0; j < boardSize[1]; j++) {
            if(i != positionNull[0] || j != positionNull[1]) {
                logica[i][j] = listaNumeros[listaNumeros.length - 1]
                listaNumeros.pop()
            }
        }
    }
    
    draw()
}

function draw() {
    board.innerHTML = "";
    for(i = 0; i < logica.length; i++) {
        let card = "";
        card += "<div class='line'>";
        for(j = 0; j < logica[i].length; j++) {
            if(logica[i][j] == null) {
                card += `<div class='square-null'></div>`;
                positionNull = [i, j]
            } else
                card += `<div class='square' onCLick="change(${i}, ${j})">${logica[i][j]}</div>`;
        }
        card += "</div>";
        board.innerHTML += card;
    }
}

function change(x, y) {
    let diferencaX = Math.abs(x-positionNull[0])
    let diferencaY = Math.abs(y-positionNull[1])

    if(diferencaX + diferencaY == 1) {
        let numero = logica[x][y]
        logica[positionNull[0]][positionNull[1]] = numero
        logica[x][y] = null;
        positionNull = [x, y]

        draw()
        verifyGameOver()
    }
}

function verifyGameOver() {
    let win = true

    let numSequence = []
    logica.map(line => {
        line.map(num => {
            numSequence.push(num)
        })
    })
    for(i = 0; i < numSequence.length - 2; i++) {
        if(numSequence[i] + 1 != numSequence[i+1])
            win = false
    }

    if(win) {
        alert('Ganhou!!!')
        alert('Novo Jogo')
        init()
    }
        
}
