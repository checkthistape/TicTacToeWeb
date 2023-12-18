/**
 * @module TicTacToe_Main
 * @description Main TicTacToe page documentation made by David Krikovtsov & Paweł Niedziela
*/

/**
 * The size of the game area.
 * @type {number}
 */
var areaSize = 3;

/**
 * Current turn number.
 * @type {number}
 */
var turn = 1;

/**
 * The winner of the game (1 or 2) or 0 if no winner yet.
 * @type {number}
 */
var winner = 0;

/**
 * Variable controlling player access (1 for access, 0 for no access).
 * @type {number}
 */
var access = 1;

/**
 * Flag to check if the game table has been generated.
 * @type {boolean}
 */
var tableGenerated = false;

/**
 * Represents the game area as a one-dimensional array that shoud be fulled by 0.1 ( [0.1, 0.1, 0.1] - 3x3 ).
 * @type {table}
 */
var area = []; // [0,1,2,  3,4,5,  6,7,8]

/**
 * Generates and adds the game table to the HTML document.
 * @param {number} areaSize - Contains the size of the game area (3x3 - 3, 4x4 - 4, etc).
 * @returns {void}
 */
function addTable(areaSize) {
    if (tableGenerated == false) {

        var myTableDiv = document.getElementById("playzone");

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


        // JQUERY CODE
        $(document).ready(function () {
            $('button#generate').css({ 'display': 'none' });
        });
        $(document).ready(function () {
            console.log("XD");
            $('table td').hover(function () {
                console.log("LOL");
                if (turn % 2 != 0) { $(this).css({ "background-color": "rgba(0,255,255,0.1)" }); }
                else { $(this).css({ "background-color": "rgba(255,0,255,0.1)" }); }

            });
            $('table td').click(function () {
                console.log("LOLCLICK");
                if ($(this).text() != "O" && $(this).text() != "X" && access == 1) {
                    var Index = $(this).attr('id').substr(1) - 1;


                    if (turn % 2 != 0) { $(this).text("X"); area[Index] = 2; }
                    else { $(this).text("O"); area[Index] = 1; }
                    turn++;
                    check();


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
 * Initializes SVG animations and color changes upon document ready.
 * Uses jQuery for handling animations and applying dynamic filters to SVG elements.
 *
 * @function
 * @returns {void}
 */
$(document).ready(function () {
    var x = 1;
    var x1 = 1;
    var x2 = 1;
    var y = 0;
    var y1 = 0;
    var y2 = 0;
    const colors = [
        "brightness(0) saturate(100%) invert(82%) sepia(41%) saturate(3151%) hue-rotate(350deg) brightness(100%) contrast(105%)", // yellow
        "brightness(0) saturate(100%) invert(51%) sepia(8%) saturate(3503%) hue-rotate(165deg) brightness(94%) contrast(86%)", // blue
        "brightness(0) saturate(100%) invert(37%) sepia(32%) saturate(782%) hue-rotate(94deg) brightness(86%) contrast(84%)", // green
        "brightness(0) saturate(100%) invert(7%) sepia(97%) saturate(5019%) hue-rotate(283deg) brightness(81%) contrast(115%)", // violet
        "brightness(0) saturate(100%) invert(15%) sepia(96%) saturate(3139%) hue-rotate(158deg) brightness(97%) contrast(91%)", // another green
        "brightness(0) saturate(100%) invert(20%) sepia(44%) saturate(4596%) hue-rotate(329deg) brightness(89%) contrast(88%)", // another pink
        "brightness(0) saturate(100%) invert(3%) sepia(78%) saturate(14%) hue-rotate(314deg) brightness(94%) contrast(87%)", // brown
        "brightness(0) saturate(100%) invert(82%) sepia(41%) saturate(3151%) hue-rotate(350deg) brightness(100%) contrast(105%)" // yellow
    ];

    setInterval(function () {
        if (x == 10) { x = 1; }
        if (y == 7) { y = 0; }
        $("svg#svg" + Math.floor(Math.random() * 9))
            .delay(250)
            .queue(function (next) {
                $(this).css({ filter: colors[Math.floor(Math.random() * 7)], width: "68px", height: "50px" });
                next();
            })
            .delay(150)
            .queue(function (next) {
                $(this).css({ filter: "none", width: "56px", height: "41px" });
                next();
            })
            .queue(function (next) {
                $(this).css({ filter: "brightness(200%)" });
                next();
            })

        x++;
        y++;

    }, 555);

    setInterval(function () {
        if (x1 == 10) { x1 = 1; }
        if (y1 == 7) { y1 = 0; }
        $("svg#svg" + Math.floor(Math.random() * 9))
            .delay(250)
            .queue(function (next) {
                $(this).css({ filter: colors[Math.floor(Math.random() * 7)] });
                next();
            })
            .delay(150)
            .queue(function (next) {
                $(this).css({ filter: "none" });
                next();
            })
            .queue(function (next) {
                $(this).css({ filter: "brightness(200%)" });
                next();
            })

        x1++;
        y1++;

    }, 666);

    setInterval(function () {
        if (x2 == 10) { x2 = 1; }
        if (y2 == 7) { y2 = 0; }
        $("svg#svg" + Math.floor(Math.random() * 9))
            .delay(250)
            .queue(function (next) {
                $(this).css({ filter: colors[Math.floor(Math.random() * 7)] });
                next();
            })
            .delay(150)
            .queue(function (next) {
                $(this).css({ filter: "none" });
                next();
            })
            .queue(function (next) {
                $(this).css({ filter: "brightness(200%)" });
                next();
            })

        x1++;
        y2++;

    }, 444);
});
/**
 * Checks the current state of the game board for a winner or a draw.
 *
 * This function examines each row, column, and diagonal to determine if a player has won.
 * If a winner is found, the 'access' variable is set to 0 and a message is logged to the console.
 * The horizontal, vertical, and diagonal checks are performed separately.
 *
 * @function
 * @returns {void}
 */
function check() {
    
    var buffer = 0;
    if (turn < areaSize * areaSize) {

        for (var x = 1; x < area.length + 1; x++) {
            var bufferVertical = 0;
            var bufferDiagonal = 0;

            if (x <= areaSize + 1) {
                // vertical - first n (n - size of area, by default 3) elements of the array (0,1,2) increase n times by n - 0, 3, 6; 1, 4, 7;
                // 0,1,2 -> 0,3,6 ; 1,4,7 ; 2, 5, 8
                for (var a = 0; a < areaSize; a++) { bufferVertical += area[x - 1 + a * 3]; /*console.log("\n\ntest: " + test + " x-1+a*3: " +(x-1+a*3)+" area[x-1+a*3]: "+area[x-1+a*3]);*/ }
                if (bufferVertical == areaSize * 2 || bufferVertical == areaSize) { access = 0; console.log("Winner vertical"); access = 0; }

                // diagonal - first element of the array (0) increase n times by n+1 (0,4,8) and n element of the array (2) increase n times by n-1 (2,4,6)
                // (0) increase n times by n+1 (0,5,10,15) and n element of the array (3) increase n times by n-1 (3,6,9,12)
                if (x == 1) { var helpV = areaSize + 1; }
                else if (x == areaSize) { var helpV = areaSize - 1; }

                for (var h = 0; h < areaSize; h++) { bufferDiagonal += area[x - 1 + h * helpV]; /*console.log("\n\ntestD: " + testD + " x-1+h*helpV: " +(x-1+h*helpV)+" area[x-1+h*helpV]: "+area[x-1+h*helpV]);*/ }
                if (bufferDiagonal == areaSize * 2 || bufferDiagonal == areaSize) { access = 0; console.log("Winner diagonal"); access = 0; }


            }

            // horizontal part
            buffer += area[x - 1];
            if (x % areaSize == 0) {
                if (buffer == areaSize) { winner = 1; console.log("winner horizontal: " + winner); access = 0; }
                else if (buffer == areaSize * 2) { winner = 2; console.log("winner horizontal: " + winner); access = 0; }
                buffer = 0;
            }
        }

    }
    else {
        access = 0;
    }
}
/**
 * Resets the game to its initial state .
 * @function
 * @returns {void}
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
    winner = 0;
    access = 1;
}
/**
 * Displays the current state of the game area in the console.
 * @function
 * @returns {void}
 */
function showUp() {
    for (var x = 1; x < area.length + 1; x++) {
        console.log(area[x - 1]);
        if (x % areaSize == 0) { console.log("\n\n"); }
    }

}
