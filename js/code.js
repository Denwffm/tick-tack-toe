var step = 0;
var isWinner = false;
var winner = "";

document.getElementById("ttt").onclick = function (event) {
    if (event.target.classList.contains('case')) {
        putSign();
        findWinner();
        checkResults();
    }
};

function putSign() {
    if (step % 2 === 0) {
        event.target.innerHTML = "X";
    }
    else {
        event.target.innerHTML = "0";
    }
    step++;
}

function checkResults() {
    if (isWinner) {
        showResult("Winner is " + winner + "!");
    } else if (step >= 9) {
        showResult("No one has won!")
    }
}

function showResult(message) {
    document.getElementById("win-info").innerHTML = message;
    $('#modal-play-again').modal('open');
}

function findWinner() {
    var gameBoard = [
        getByClass("line_1"),
        getByClass("line_2"),
        getByClass("line_3")
    ];

    for (var i = 0; i < 3; i++) {
        isWinner = checkHorizontal(i, gameBoard) || checkVertical(i, gameBoard) || checkDiagonal(gameBoard);
        if (isWinner) break;
    }

    function checkHorizontal(i, gameBoard) {
        var cell = gameBoard[i][0].innerHTML;
        var hasWon = cell !== '' && cell === gameBoard[i][1].innerHTML && cell === gameBoard[i][2].innerHTML;

        if (hasWon) winner = cell;
        return hasWon;
    }

    function checkVertical(i, gameBoard) {
        var cell = gameBoard[0][i].innerHTML;
        var hasWon = cell !== '' && cell === gameBoard[1][i].innerHTML && cell === gameBoard[2][i].innerHTML;

        if (hasWon) winner = cell;
        return hasWon;
    }

    function checkDiagonal(gameBoard) {
        var cell = gameBoard[1][1].innerHTML;
        var hasWon = cell !== '' && ((cell === gameBoard[0][0].innerHTML && cell === gameBoard[2][2].innerHTML)
            || (cell === gameBoard[0][2].innerHTML && cell === gameBoard[2][0].innerHTML));

        if (hasWon) winner = cell;
        return hasWon;
    }
}

function getByClass(line) {
    return document.getElementsByClassName(line);
}