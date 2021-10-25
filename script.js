let boardSize = [4, 4]
let board;
let logica = [];
let positionNull;
let level = 4;
let plays = 0

window.onload = () => {
    board = document.getElementById("board");
}

function init() {
    document.getElementById("button-game-over").style = "display: block"
    document.getElementById("info-plays").style = "display: block"

    boardSize[0] = level
    boardSize[1] = level

    plays = 0
    document.getElementById('info-plays').innerHTML = plays + ' jogadas'

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

        plays++;
        document.getElementById('info-plays').innerHTML = plays + ' jogadas'

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
        alert('Ganhou!!! ' + plays + " plays!")
        if(window.localStorage.getItem('@record') < plays)
            window.localStorage.setItem('@record', plays)
        gamerOver();
        init()
    }
        
}

function gamerOver() {
    board.innerHTML = `
        <button class='square' style="width: auto" onclick="init()">Novo Jogo</button>
        <div style="display: flex; justify-content: space-between; align-items: center">
            <button class='square' onclick="changeLevel('-')">-</button>
            <div id="info-level">${level}</div>
            <button class='square' onclick="changeLevel('+')">+</button>
        </div>
        <divv style="display: flex; justify-content: center; align-items: center; margin-top: 10px;"> 
            <span id="record"></span>
        </div>
    `
    if(window.localStorage.getItem("@record"))
                document.getElementById("record").innerHTML = "Record: " + window.localStorage.getItem("@record") + " jogadas"

    document.getElementById("button-game-over").style = "display: none"
    document.getElementById("info-plays").style = "display: none"
}

function changeLevel(type) {
    if(type == "-" && level > 4)
        level -= 1
    else if(type == "+" && level < 10)
        level += 1
    document.getElementById("info-level").innerHTML = level
}
