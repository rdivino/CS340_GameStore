//add_orderdetails.js
//     Citation for the following function:
//     Date: 3/5/2024
//     Copied from /OR/ Adapted from /OR/ Based on:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//

// Get the objects we need to modify
let addOrderDetailsForm = document.getElementById('add-orderdetails-form-ajax');

// Modify the objects we need
addOrderDetailsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderID = document.getElementById("input-order_id");
    let inputProductID = document.getElementById("input-product_id");

    // Get the values from the form fields
    let order_idValue = inputOrderID.value;
    let product_idValue = inputProductID.value;


    // Put our data we want to send in a javascript object
    let data = {
        order_id: order_idValue,
        product_id: product_idValue

    }

    console.log(data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-orderdetails-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrderID.value = '';
            inputProductID.value = '';

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
    let currentTable = document.getElementById("orderdetails-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let orderdetails_idCell = document.createElement("TD");
    let order_idCell = document.createElement("TD");
    let product_idCell = document.createElement("TD");
    

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    orderdetails_idCell.innerText = newRow.orderdetails_id;
    order_idCell.innerText = newRow.order_id;
    product_idCell.innerText = newRow.product_id;
    

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteOrderDetails(newRow.orderdetails_id);
    };

    // Add the cells to the row 
    row.appendChild(orderdetails_idCell);
    row.appendChild(order_idCell);
    row.appendChild(product_idCell);
    
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.orderdetails_id);

    // Add the row to the table
    currentTable.appendChild(row);

}