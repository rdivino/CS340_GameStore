//add_discount.js
//     Citation for the following function:
//     Date: 3/4/2024
//     Copied from /OR/ Adapted from /OR/ Based on:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//

// Get the objects we need to modify
let addDiscountForm = document.getElementById('add-discount-form-ajax');

// Modify the objects we need
addDiscountForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDiscountName = document.getElementById("input-discount_name");
    let inputPercent = document.getElementById("input-percent");
    let inputDuration = document.getElementById("input-duration");
    let inputActive= document.getElementById("input-active");

    // Get the values from the form fields
    let discount_nameValue = inputDiscountName.value;
    let percentValue = inputPercent.value;
    let durationValue = inputDuration.value;
    let activeValue = inputActive.value;
    
    // Put our data we want to send in a javascript object
    let data = {
        discount_name: discount_nameValue,
        percent: percentValue,
        duration: durationValue,
        active: activeValue
    }

    console.log(data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-discount-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);
            
            // Clear the input fields for another transaction
            inputDiscountName.value = '';
            inputPercent.value = '';
            inputDuration.value= '';
            inputActive.value = '';

        }

        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("discount-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let discount_idCell = document.createElement("TD");
    let discount_nameCell = document.createElement("TD");
    let percentCell = document.createElement("TD");
    let durationCell = document.createElement("TD");
    let activeCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    discount_idCell.innerText = newRow.discount_id;
    discount_nameCell.innerText = newRow.discount_name;
    percentCell.innerText = newRow.percent;
    durationCell.innerText = newRow.duration;
    activeCell.innerText = newRow.active;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteDiscount(newRow.discount_id);
    };

    // Add the cells to the row 
    row.appendChild(discount_idCell);
    row.appendChild(discount_nameCell);
    row.appendChild(percentCell);
    row.appendChild(durationCell);
    row.appendChild(activeCell);
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.discount_id);

    // Add the row to the table
    currentTable.appendChild(row);
}