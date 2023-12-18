/**
 * @module TicTacToe_with_MiniMax
 * @description This is code that menages the TicTacToe game and allows to play against a MiniMax algorithm
*/

/**
 * @param {Number} areaSize size of the game field must be 3 x 3 because the algorithm can't handle any larger ones.
 * @param {Number} turn used to track number of turns and whose turn it is to play.
 * @param {Number} access used to reset the board after finished game.
 * @param {boolean} tableGenerated used to chcek if the game field has been generated.
 * @param {Map} rootMap used by MiniMax algorith to rate diferent moves and than compare them.
 * @param {table} area used to store current board.
 * @param {boolean} playerFirst used to determin who has the first move. Player or bot.
 */
const areaSize = 3;
var turn = 1;
var access = 1;
var tableGenerated = false;
rootMap = new Map();
var area = [];
var playerFirst = false;
/**
 * @method addTable
 * @description used to generate new game field the size of wchich is determined by areaSize variable it also houses all of the game menagement code
 */
function addTable(areaSize) {
    if (tableGenerated == false) {

        var myTableDiv = document.getElementById("left");

        var table = document.createElement('table');

        var tableBody = document.createElement('tbody');
        table.appendChild(tableBody);

        var id = 1;
        for (var i = 0; i < areaSize; i++) {
            var tr = document.createElement('tr');
            tableBody.appendChild(tr);

            for (var j = 0; j < areaSize; j++) {
                area.push(0.1);
                var td = document.createElement('td');
                td.id = "t" + id;
                tr.appendChild(td);
                id++;
            }
        }
        myTableDiv.appendChild(table);
        tableGenerated = true;
        if (!playerFirst) {
            console.log(MiniMax(area));
        }

        // JQUERY CODE
        $(document).ready(function () {
            $('button#generate').css({ 'display': 'none' });
        });
        $(document).ready(function () {
            $('.left table td').hover(function () {
                if (turn % 2 != 0) { $(this).css({ "background-color": "rgba(0,255,255,0.1)" }); }
                else { $(this).css({ "background-color": "rgba(255,0,255,0.1)" }); }

            });
            $('.left table td').click(function () { //Squere clicked
                if ($(this).text() != "O" && $(this).text() != "X" && access == 1) {
                    let index = $(this).attr('id').substr(1) - 1;

                    if (turn % 2 != 0) {
                        $(this).text("X");
                        area[index] = 2;
                    }
                    else {
                        $(this).text("O");
                        area[index] = 1;
                    }
                    check();
                    turn++;

                    if (playerFirst && (turn % 2 === 0)) {
                        rootMap.clear(); //cleares map aftar last use
                        console.log(MiniMax(area));
                    }
                    else if (!playerFirst && (turn % 2 != 0)) {
                        rootMap.clear(); //cleares map aftar last use
                        console.log(MiniMax(area));
                    }
                }
                else if (access == 0) { reset(); access = 1; }

            });
            $('td').mouseout(function () {
                $(this).css({ "background-color": "white" });
            });
        });
    }
}
/**
 * @method GetAvalibleMoves
 * @description Used to get all the possible moves that can be made on a given board 
 * @param {table} board board to check
 * @returns {table} table containg indexes of all free spaces
 */
function GetAvalibleMoves(board) {
    var moves = [];
    for (var i = 0; i < areaSize * areaSize; i++) {
        if (board[i] == 0.1) {
            moves.push(i);
        }
    }
    return moves;
}

/**
 * @method isTerminal
 * @deprecated Used to check if the game on a given board is finished and if yes, who won or if was it a draw
 * @param {table} board board to check
 * @returns {*} 'X' if x player won 'O' if o player won 'draw' if it is a draw 'none' if the game has not ended
 */
function isTerminal(board) {
    let bufferHorizontal = 0;
    for (let x = 1; x < board.length + 1; x++) {
        let bufferVertical = 0;
        let bufferDiagonal = 0;

        if (x <= areaSize) {
            //Check Vertical
            for (let a = 0; a < areaSize; a++) { bufferVertical += board[x - 1 + a * areaSize]; }
            if (bufferVertical == areaSize * 2) {
                return { 'winner': 'X' };
            }
            else if (bufferVertical == areaSize) {
                return { 'winner': 'O' }
            }

            //Check Diagonal
            if (x == 1 || x == areaSize) {
                let helpV = 0
                if (x == 1) { helpV = areaSize + 1; }
                if (x == areaSize) { helpV = areaSize - 1; }

                for (let h = 0; h < areaSize; h++) { bufferDiagonal += board[x - 1 + h * helpV]; }
                if (bufferDiagonal == areaSize * 2) {
                    return { 'winner': 'X' };
                }
                else if (bufferDiagonal == areaSize) {
                    return { 'winner': 'O' }
                }
            }
        }
        //Check Horizontal
        bufferHorizontal += board[x - 1];
        if (x % areaSize == 0) {
            if (bufferHorizontal == areaSize * 2) {
                return { 'winner': 'X' };
            }
            else if (bufferHorizontal == areaSize) {
                return { 'winner': 'O' }
            }
            bufferHorizontal = 0;
        }
    }

    //Check if it is a draw
    let isDraw = true;
    for (let i = 0; i < board.length; i++) {
        if (board[i] == 0.1) { isDraw = false; break; }
    }
    if (isDraw == true) return { 'winner': 'draw' };

    //If non of the condicions are met, the board is not terminal
    return { 'winner': 'none' };
}

/**
 * @method MiniMax
 * @description Used to get best possible move in a given situation. Method is recursive to predict all the moves and their resuts.
 * @param {table} board board to check
 * @param {boolean} Mturn used by the algorith to determin if it's his turn or the oponent's. By default this variable is set to true.
 * @param {Number} depth used by the algorith to return the quickest way to win or the slowest way to lose.
 * @returns {Number} Index of the best possible move
 */
function MiniMax(board, Mturn = true, depth = 0) {

    let winner = isTerminal(board).winner;
    if (winner !== 'none') { //check if current board is the end of the game and return a value based on the result
        if (winner === 'X') {
            if (playerFirst) {
                return -100 + depth;
            }
            else {
                return 100 - depth
            }
        }
        else if (winner === 'O') {
            if (playerFirst) {
                return 100 - depth;
            }
            else {
                return -100 + depth
            }
        }
        return 0;
    }

    if (Mturn) { //if it is O turn in given board
        let best = -100;
        GetAvalibleMoves(board).forEach(index => { //Try for each possible move
            let newBoard = [...board];
            if (playerFirst) newBoard[index] = 1;
            else newBoard[index] = 2;
            let rootValue = MiniMax(newBoard, false, depth + 1);
            best = Math.max(best, rootValue);
            if (depth == 0) {
                rootMap.set(index, rootValue);
            }
        });
        //If not main call (recursive) return the value for next calculation
        if (depth != 0) return best;
    }
    if (!Mturn) {
        let best = 100;
        GetAvalibleMoves(board).forEach(index => {
            let newBoard = [...board];
            if (playerFirst) newBoard[index] = 2;
            else newBoard[index] = 1;
            let rootValue = MiniMax(newBoard, true, depth + 1);
            best = Math.min(best, rootValue);
        })
        //If not main call (recursive) return the value for next calculation
        return best;
    }
    let result = -1;
    GetAvalibleMoves(board).forEach(index => {
        if (result == -1 || rootMap.get(index) > rootMap.get(result)) result = index;
        else if (result != -1 && rootMap.get(index) === rootMap.get(result)) {
            if (Math.floor(Math.random() * 2) === 0) result = index;
        }
    })
    return result;
}

/**
 * @method check
 * @description Used to check if the game has ended
 */
function check() {
    let tmp = isTerminal(area).winner;
    if (tmp !== 'none') {
        if (tmp == "X") { access = 0; alert("X player won"); }
        else if (tmp == "O") { access = 0; alert("O player won"); }
        else { access = 0; alert("Draw"); }
    }
}

/**
 * @method reset
 * @description Used to reset the board after a finished game.
 */
function reset() {
    turn = 1;
    $(document).ready(function () {
        $('td').each(function () {
            $(this).text("");
        })
        $('p#result').text("");
    });
    area = [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
    access = 1;
    if (!playerFirst) {
        console.log(MiniMax(area));
    }
}