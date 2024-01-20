
function validateInput(event) {

    if (isNaN(event.target.value)) {
        alert('Enter a valid input.')
        event.target.value = ''
    }
}

// creates a single cell, with the argument
// 'content' (a string) as content, and returns it
function createCell(content) {
    let cell = document.createElement('td');
    cell.innerText = content;
    cell.addEventListener('mouseover', handleColorCellEvent)
    return cell;
}


// creates a single row and returns it
function createRow() {
    let tableRow = document.createElement('tr');
    return tableRow;
}


// creates the table, using createRow and createCell, and returns it
function createTable(rows, columns) {

    //create an empty table element
    let table = document.createElement('table');

    for (let x = 0; x < rows; x++) {
        //create a table row
        let row = createRow();

        //create columns
        for (let y = 0; y < columns; y++) {
            //insert the cells
            let cell = createCell(`(${x}, ${y})`);
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    return table;
}


// reads amount of rows and colums from the input fields with IDs rowInputID and columnInputID;
// generates the table using createTable; fetches the HTML element where to
// inject the table based on anID; adds the table to the fetched HTML element

function injectTable(tableId, rowInputID, columnInputID) {

    tableId.innerHTML = '';

    if (rowInputID.value <= 0 || columnInputID.value <= 0) {

        alert('Please enter a valid value for the table row and column.');

    } else {

        //create the table
        let table = createTable(rowInputID.value, columnInputID.value);
        //inject it in the table location
        tableId.appendChild(table);
    }

}

function handleColorCellEvent(event) {
    makeCellContentRed(event)
}

function handleColorChangeEvent(event) {
    makeCellContentBlue(event)
}

function makeCellContentRed(event) {
    event.target.style.color = 'red';
    event.target.removeEventListener('mouseover', handleColorCellEvent)
    event.target.addEventListener('mouseout', handleColorChangeEvent)
}

function makeCellContentBlue(event) {
    event.target.style.color = 'blue';
}

