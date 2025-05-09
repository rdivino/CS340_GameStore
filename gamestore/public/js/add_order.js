//add_orderdetails.js
//     Citation for the following function:
//     Date: 3/4/2024
//     Copied from /OR/ Adapted from /OR/ Based on:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//

// Get the objects we need to modify
let addOrderForm = document.getElementById('add-order-form-ajax');

// Modify the objects we need
addOrderForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerID = document.getElementById("input-customer_id");
    let inputTotal = document.getElementById("input-total");

    // Get the values from the form fields
    let customer_idValue = inputCustomerID.value;
    let totalValue = inputTotal.value;


    // Put our data we want to send in a javascript object
    let data = {
        customer_id: customer_idValue,
        total: totalValue

    }

    console.log(data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerID.value = '';
            inputTotal.value = '';

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
    let currentTable = document.getElementById("order-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let order_idCell = document.createElement("TD");
    let customer_idCell = document.createElement("TD");
    let totalCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    order_idCell.innerText = newRow.order_id;
    customer_idCell.innerText = newRow.customer_id;
    totalCell.innerText = newRow.total;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteOrder(newRow.order_id);
    };

    // Add the cells to the row 
    row.appendChild(order_idCell);
    row.appendChild(customer_idCell);
    row.appendChild(totalCell);
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.order_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
/*     let orderMenu = document.getElementById("input-order-update");
    let orderOption = document.createElement("optionOrder");
    orderOption.text = newRow.order_id; // FIXED ID SHOWING IN DROPDOWN
    orderOption.value = newRow.order_id;
    orderMenu.add(orderOption); */

    let customerMenu = document.getElementById("input-customer_id-update");
    let customerOption = document.createElement("optionCustomer");
    customerOption.text = newRow.customer; 
    customerOption.value = newRow.customer;
    customerMenu.add(customerOption);

}