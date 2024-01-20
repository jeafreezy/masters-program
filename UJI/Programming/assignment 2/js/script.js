
/* 

Name: Emmanuel Jolaiya (emmanuel.jolaiya@uji.es).

Course: SJL001 Programming Assignment 2 - Bejeweled.

Professor: Sven Casteleyn.

University: UJI, Spain.

Date: November, 2023. 

*/

//-------------------------------------------------------------------------------
// General concepts.
// td - a <td></td> element.
// cell - a single cell in a table. A cell is also a td element in the table. A cell contains
// a color, row value and column value data.
//-------------------------------------------------------------------------------


// ###################################### GLOBAL VARIABLES #############################################

// this global variable will store the remaining turn of the user. It is initialized with 5 turns.
let DEFAULT_TURNS = 5;
let STARTING_SCORE = 0;

let turnsLeft = DEFAULT_TURNS;

// this global variable will store the total score of the user. It is initialized with 0.
let totalScore = STARTING_SCORE;

// this global variable stores the private data attribute used to store the row number in the td element.
let ROW_DATA_ATTRIBUTE_TAG = 'data-row';

// this global variable stores the private data attribute used to store the column number in the td element.
let COLUMN_DATA_ATTRIBUTE_TAG = 'data-col';

// this global variable stores the private data attribute used to store the color in the td element.
let COLOR_DATA_ATTRIBUTE_TAG = 'data-color';

// getting the elements 

// this variable stores the reference to the table element.
let tableLocation = document.getElementById('tbl');
// this variable stores the reference to the span element that displays the user score.
let scoreElement = document.getElementById('score');
// set the initial score
scoreElement.innerText = STARTING_SCORE;
// this variable stores the reference to the span element that displays the user  turns.
let turnsElement = document.getElementById('turns');
// set the initial turns
turnsElement.innerText = DEFAULT_TURNS;
// this variable stores the reference to the button element that injects the table.
let playButton = document.getElementById("play-button");

// this variable stores the reference to the button element that removes the table.
let resetButton = document.getElementById("reset-button");


// adding the event listeners
playButton.addEventListener("click", injectTable);
resetButton.addEventListener("click", resetGame);

// global variable to store the audio effect configuration and their paths

let soundEffects = {
    swap: {
        audioPath: "./audio/reshuffling_sound.wav",
        type: 'swapElements'
    },
    bonusPoint: {
        audioPath: "./audio/bonus_sound.wav",
        type: 'bonusPoints'
    },
    normalPoint: {
        audioPath: "./audio/points.wav",
        type: 'normalPoint'
    },
}


// ###################################### ABSTRACTIONS STARTS #############################################

/* 
    An utility function to generate a random number between 0 and the number given as argument.
*/

function generateRandomNumber(num) {
    return Math.floor(Math.random() * num);
}

/* 
    An utility function to handle the generation of a random color.
*/
function generateRandomColor() {
    // an array of the colors used in the game.
    let supportedColors = ['red', 'blue', 'yellow', 'green', 'white', 'purple'];
    return supportedColors[generateRandomNumber(supportedColors.length)];
}

//-------------------------------------------------------------------------------
// array structure concept: [color,[row,column]].
//-------------------------------------------------------------------------------

/*
    A function that construct the cell structure from the given color, row and col.
*/
function constructCellStructure(color, row, col) {
    return [color, [row, col]];
}

/*
     function that returns the row number from the given cell array argument.
*/
function getCellRow(cell) {
    return cell[1][0];
}

/*
    function that returns the color from the given cell array argument. 
*/
function getCellColor(cell) {
    return cell[0];
}

/*
    A function that returns the column number from the given cell array argument.
*/
function getCellColumn(cell) {
    return cell[1][1];
}

//-------------------------------------------------------------------------------
// General concept. Cell elements are expected to be a td element. <td></td>
// Also the outputs are parsed as integers for easy array indexing.
//-------------------------------------------------------------------------------

/*
    A function that extracts the cell row from the data attribute of td element.
*/
function getCellRowFromElement(cellElement) {
    return parseInt(cellElement.getAttribute(ROW_DATA_ATTRIBUTE_TAG));
}

/*
    A function that extracts the cell column from the data attribute of td element.
*/
function getCellColumnFromElement(cellElement) {
    return parseInt(cellElement.getAttribute(COLUMN_DATA_ATTRIBUTE_TAG));
}

/*
    A function that extracts the cell color from the data attribute of td element.
*/
function getCellColorFromElement(cellElement) {
    return cellElement.getAttribute(COLOR_DATA_ATTRIBUTE_TAG);
}


/*
    A function that construct the cell structure from the given <td></td> element.
*/
function constructCellStructureFromElement(tdElement) {
    return constructCellStructure(
        getCellColorFromElement(tdElement),
        getCellRowFromElement(tdElement),
        getCellColorFromElement(tdElement)
    );
}

/*
    A function that validates the user input in the form. It ensures the user enters a valid number.
    i.e it's not a string and it's not empty.
*/
function validateInput(element) {
    return isNaN(element.value) || element.value.length === 0;
}

/*
    A function that returns the path to the icon for a given color.
*/
function getIconPath(color) {
    // an object that maps the colors to their icon paths.
    let iconPaths = {
        red: '../img/red.png',
        blue: '../img/blue.png',
        yellow: '../img/yellow.png',
        white: '../img/white.png',
        green: '../img/green.png',
        purple: '../img/purple.png'
    };
    return iconPaths[color];
}

/*
    A function that creates a single cell i.e <td></td> element, with the data attributes: color, row and column. 
    It inserts an image that match the color within each td element. And finally returns the td element.
*/
function createCell(color, row, column) {
    // create a td element
    let cell = document.createElement('td');
    // create an image element and append to the cell.
    let cellImage = document.createElement('img');
    // get the icon for the image
    cellImage.src = getIconPath(color);
    // append the image within the td element.
    cell.appendChild(cellImage);
    // add a data attributes to the cell to store the private data i.e color, row and col
    cell.setAttribute(ROW_DATA_ATTRIBUTE_TAG, row);
    cell.setAttribute(COLUMN_DATA_ATTRIBUTE_TAG, column);
    cell.setAttribute(COLOR_DATA_ATTRIBUTE_TAG, color);
    return cell;
}

/*
    A function that creates a single table row and returns it.
*/
function createRow() {
    let tableRow = document.createElement('tr');
    return tableRow;
}

/*
    A function that updates the user score.
*/
function updateScore(score) {
    // update the global score
    totalScore = totalScore + score;
    // update the user score with the new score
    scoreElement.innerText = totalScore;
    return;
}

/*
    A function that updates the user turns.
*/
function updateTurns(turns) {
    // update the user turn with the new score 
    turnsElement.innerText = turnsLeft;
}

/*
    An utility function that is used to get the maximum number in an array.
*/
function getMaximumNumber(rows) {
    let minimumIndex = parseInt(rows[0]);
    for (let i = 0; i < rows.length; i++) {
        minimumIndex = Math.max(minimumIndex, parseInt(rows[i]));
    }

    return minimumIndex;
}

/*
    An utility function that is used to get the minimum number in an array.
*/
function getMinimumNumber(rows) {
    let minimumIndex = parseInt(rows[0]);
    for (let i = 0; i < rows.length; i++) {
        minimumIndex = Math.min(minimumIndex, parseInt(rows[i]));
    }

    return minimumIndex;
}

/*
    A function that removes event listener on the table.
*/

function disableClickEvents(table) {
    table.removeEventListener('click', handleClickEvent);
}

/*
    A function that adds event listener to the table.
*/
function enableClickEvents(table) {
    table.addEventListener('click', handleClickEvent);
}



/*
    A function that creates a table from the given row and column number.
*/
function createTable(row, col) {
    // create an empty table element
    let table = document.createElement('table');
    // loop through rows
    for (let i = 0; i < row; i++) {
        // create a table row
        let tblRow = createRow();
        // loop through the column and create a cell
        for (let j = 0; j < col; j++) {
            // insert the cells with a random color
            let cellColor = generateRandomColor();
            // update the column with the rows cell.
            let cell = createCell(cellColor, i, j);
            // append the columns to the row
            tblRow.appendChild(cell);
        }
        // append the rows to the table
        table.appendChild(tblRow);
    }
    // add event listener to the table.
    enableClickEvents(table);
    // return the table
    return table;
}
/*
    A function that clears the input form elements.
*/
function clearInput(rows, cols) {
    rows.value = '';
    cols.value = '';
}
/*
    A function that reads the amount of rows and colums from the input fields using their IDs
    and generates the table using createTable() function.
    and inject the table in the appropriate location in the DOM tree.
*/
function injectTable() {
    // get the rows and column element from the html
    let rows = document.getElementById("rows");
    let cols = document.getElementById("columns");

    // when the submit button is clicked when game is ongoing, 
    // ensure that the user cannot interupt the game by overriding the current table.
    if (totalScore > 0 && turnsLeft !== 0) {
        alert('The game is ongoing, please finish before recreating a new table, or quit the game.');
        return
    }
    // validate the user input. Ensure the user enters a valid integer.
    if (validateInput(rows) || validateInput(cols)) {
        alert('Please enter a valid row and column number. Must be an integer.');
        clearInput(rows, cols);
        return
    }

    // clear previous table element if any
    tableLocation.innerHTML = '';

    // create a new table from the matrix
    let table = createTable(parseInt(rows.value), parseInt(cols.value));

    // inject it in the html
    tableLocation.appendChild(table);
    // clear the form input elements
    clearInput(rows, cols);

    return table;
}

/*
    A function that returns the right cell to a given cell coordinates(row,col) in a table. 
    It returns an empty array if no cell is in the right.
*/
function getRightCell(tableRows, cell) {
    if (tableRows[getCellRow(cell)].cells[getCellColumn(cell) + 1] === undefined) {
        return undefined;
    }
    return tableRows[getCellRow(cell)].cells[getCellColumn(cell) + 1];
}


/*
    A function that returns the left cell to a given cell coordinates(row,col) in a table. 
    It returns an empty array if no cell is in the left.
*/
function getLeftCell(tableRows, cell) {
    if (tableRows[getCellRow(cell)].cells[getCellColumn(cell) - 1] === undefined) {
        return undefined;
    }
    return tableRows[getCellRow(cell)].cells[getCellColumn(cell) - 1];
}

/*
    A function that returns the top cell to a given cell coordinates(row,col) in a table. 
    It returns an empty array if no cell is in the top.
*/
function getTopCell(tableRows, cell) {
    if (tableRows[getCellRow(cell) - 1] === undefined) {
        return undefined;
    }
    return tableRows[getCellRow(cell) - 1].cells[getCellColumn(cell)];
}

/*
    A function that returns the bottom cell to a given cell coordinates(row,col) in a table. 
    It returns an empty array if no cell is in the bottom.
*/
function getBottomCell(tableRows, cell) {
    if (tableRows[getCellRow(cell) + 1] === undefined) {
        return undefined;
    }
    return tableRows[getCellRow(cell) + 1].cells[getCellColumn(cell)];
}

/*
    A function that handles the playing of audio sounds.
*/
function playAudio(type) {
    // an empty variable to store the sound effect
    let soundEffect;
    switch (type) {
        case soundEffects.swap.type:
            soundEffect = new Audio(soundEffects.swap.audioPath);
            soundEffect.play();
            return
        case soundEffects.bonusPoint.type:
            soundEffect = new Audio(soundEffects.bonusPoint.audioPath);
            soundEffect.play();
            return
        case soundEffects.normalPoint.type:
            soundEffect = new Audio(soundEffects.normalPoint.audioPath);
            soundEffect.play();
            return
        default:
            return

    }
}
/*
    A function that replaces the content of a <td> element with that of another. 
    It copies all the attributes including the child images.
*/
function swapCells(actualCell, replacementCell) {

    // play the audio sound when swipping elements
    playAudio(soundEffects.swap.type);

    actualCell.innerHTML = replacementCell.innerHTML;
    // make the replacement cell empty first. This is useful for animation effect.
    replacementCell.innerHTML = '';
    // transfer the attribute from the old to the new cell
    actualCell.setAttribute(COLOR_DATA_ATTRIBUTE_TAG, getCellColorFromElement(replacementCell));
}



/*
    A function to reshuffles the table.
*/
function reShuffleTable(table, cellsToRemove) {


    // first disable click events
    disableClickEvents(table);

    // Data structure: 
    // An object with the columns of the affected cells as keys and the affected rows as values in an array.
    // {    
    //   affectedColumn1:[affectedRow1,affectedRow2],
    //   affectedColumn2:[affectedRow1] 
    // }

    let affectedCells = {};


    for (let i = 0; i < cellsToRemove.length; i++) {
        // grab the actual cell to remove.
        let cellElement = cellsToRemove[i];

        // get the row and column number from the <td>
        let rowNumber = getCellRowFromElement(cellElement);
        let columnNumber = getCellColumnFromElement(cellElement);

        // construct the data structure.
        // if the column does not exist in the object, it will be undefined. 
        // So create it otherwise, append to the rows to the existing array.
        if (affectedCells[columnNumber] === undefined) {
            affectedCells[columnNumber] = [rowNumber];
        } else {
            affectedCells[columnNumber].push(rowNumber);
        }

        // remove the affected cells from the table to initiate an animation effect during swapping.
        table.rows[rowNumber].cells[columnNumber].innerHTML = '';

    }

    // after constructing data structure and removing the affected cells.
    // then get the minimum and maximum column, to limit the looping within the column bounds.

    // get the columns
    let uniqueAffectedColumns = Object.keys(affectedCells);

    // get the minimum column, this will be where the loop with start from.
    let minimumColumnIndex = getMinimumNumber(uniqueAffectedColumns);
    // get the maximum column, this will be where the loop with stop.
    let maximumColumnIndex = getMaximumNumber(uniqueAffectedColumns);

    // starting timeout delay.

    let timeOut = 500;

    // start the loop.
    for (let col = minimumColumnIndex; col <= maximumColumnIndex; col++) {

        // while looping, get the object of the current column.
        // from the data structure i.e {col:[row1,row1]}
        // get the current column
        let rowsToSwap = affectedCells[col];
        // then get the minimum and maximum number from the array of affected rows in this column.
        let maximumRowIndex = getMaximumNumber(rowsToSwap);
        let minimumRowIndex = getMinimumNumber(rowsToSwap);

        // conceptually, the next cell to replace with, will always be the minimum row - 1

        let replacementIndex = minimumRowIndex - 1;

        // now loop through the rows in the current column. Loop backward up starting from the maximum index
        for (let row = maximumRowIndex; row > -1; row--) {

            // get the value from the next top row in the table.
            let nextTopRows = table.rows[replacementIndex];

            // get the current cell.
            let currentCell = table.rows[row].cells[col];

            // if there is a top row, then swap it, otherwise that means it's outside the table.
            // in this scenerio, generate a random color, then swap.

            setTimeout(function () {
                if (nextTopRows === undefined) {
                    swapCells(currentCell, createCell(generateRandomColor(), row, col));
                } else {
                    swapCells(currentCell, nextTopRows.cells[col]);
                }
            }, timeOut);

            // increment the delay
            timeOut += 200;

            // reduce the replacement index to go to the next top index
            replacementIndex--;
        }



    }

    // enable click events back after animation delay is completed
    setTimeout(() => {
        enableClickEvents(table);
    }, timeOut);

}


/*
    A function that check for matching neighbors around the clicked cell.
*/
function getMatchedNeighbors(table, selectedCell) {

    // get the rows in the table.
    let tableRows = table.rows;
    // an empty array to store the matched neighbors.
    let matchedNeighbors = [];
    // check for the neighbors in a clockwise direction.
    let neighbors = [
        getTopCell(tableRows, selectedCell),
        getRightCell(tableRows, selectedCell),
        getBottomCell(tableRows, selectedCell),
        getLeftCell(tableRows, selectedCell)
    ];

    for (let i = 0; i < neighbors.length; i++) {
        // if there is a value i.e the neighbor has not exited.
        if (neighbors[i] !== undefined) {
            // check for color match
            if (getCellColor(constructCellStructureFromElement(neighbors[i])) === getCellColor(selectedCell)) {
                matchedNeighbors.push(neighbors[i]);
            }
        }

    }
    // return the matched neighbors
    return matchedNeighbors;
}


/*
    A function that resets the game.
*/
function resetGame() {

    // reset total turn and scores.
    turnsLeft = DEFAULT_TURNS;
    totalScore = STARTING_SCORE;
    // update the scores and turns.
    updateTurns(DEFAULT_TURNS);
    updateScore(STARTING_SCORE);
    // remove the table
    tableLocation.innerHTML = '';
}

/*
    A function that plays sound and animate the turns element when a user score more thrn 3 points.
*/

function handleTurnIncrease() {
    // play the sound
    playAudio(soundEffects.bonusPoint.type)

    // add the animation class to the parent div
    let parentDiv = turnsElement.parentNode;

    parentDiv.classList.add('score-animation');

    // remove the animation class after a short delay
    setTimeout(() => {
        parentDiv.classList.remove('score-animation');
    }, 1000);

    // increment the turns
    updateTurns(++turnsLeft);
}


/*
    A function that handles the click event when a cell is clicked.
*/
function handleClickEvent(event) {

    // if the user has completed their turns, they have to start again
    if (turnsLeft == 0) {
        alert('Game over! Your total score is: ' + totalScore);
        resetGame();
        return;
    }

    // construct an internal cell structure from the data attribute of the selected cell.
    let selectedCell = constructCellStructure(
        getCellColorFromElement(event.target),
        getCellRowFromElement(event.target),
        getCellColumnFromElement(event.target)
    );

    // access the table
    let table = event.target.parentNode.parentNode;

    // decrement the user turns
    updateTurns(turnsLeft--);



    // get the neighbors of the selected cell.
    let neighbors = getMatchedNeighbors(table, selectedCell);

    // update the array of elements to remove with the actual selected cell by the user.
    neighbors.push(event.target);

    // update the score on the page.
    updateScore(neighbors.length);

    // also play a sound when they are removed.
    playAudio(soundEffects.normalPoint.type)

    // reshuffle the table
    reShuffleTable(table, neighbors);

    // if the score point is greater than 3, 
    // increment the user turns
    if (neighbors.length > 3) {
        handleTurnIncrease();
    }
}


