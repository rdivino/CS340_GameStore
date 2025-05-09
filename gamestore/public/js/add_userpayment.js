//add_userpayment.js
//     Citation for the following function:
//     Date: 3/6/2024
//     Copied from /OR/ Adapted from /OR/ Based on:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//

// Get the objects we need to modify
let addUserPaymentForm = document.getElementById('add-userpayment-form-ajax');

// Modify the objects we need
addUserPaymentForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerID = document.getElementById("input-customer_id");
    let inputPaymentType = document.getElementById("input-payment_type");
    let inputProvider = document.getElementById("input-provider");
    let inputAccountNum = document.getElementById("input-account_num");
    let inputExpiry = document.getElementById("input-expiry");

    // Get the values from the form fields
    let customer_idValue = inputCustomerID.value;
    let payment_typeValue = inputPaymentType.value;
    let providerValue = inputProvider.value;
    let account_numValue = inputAccountNum.value;
    let expiryValue = inputExpiry.value;

    // Put our data we want to send in a javascript object
    let data = {
        customer_id: customer_idValue,
        payment_type: payment_typeValue,
        provider: providerValue,
        account_num: account_numValue,
        expiry: expiryValue,
    }

    console.log(data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-userpayment-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCustomerID.value = '';
            inputPaymentType.value = '';
            inputProvider.value = '';
            inputAccountNum.value = '';
            inputExpiry.value = '';
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
    let currentTable = document.getElementById("userpayment-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let userpayment_idCell = document.createElement("TD");
    let customer_idCell = document.createElement("TD");
    let payment_typeCell = document.createElement("TD");
    let providerCell = document.createElement("TD");
    let account_numCell = document.createElement("TD");
    let expiryCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    userpayment_idCell.innerText = newRow.userpayment_id;
    customer_idCell.innerText = newRow.customer_id;
    payment_typeCell.innerText = newRow.payment_type;
    providerCell.innerText = newRow.provider;
    account_numCell.innerText = newRow.account_num;
    expiryCell.innerText = newRow.expiry;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteUserPayment(newRow.userpayment_id);
    };

    // Add the cells to the row 
    row.appendChild(userpayment_idCell);
    row.appendChild(customer_idCell);
    row.appendChild(payment_typeCell);
    row.appendChild(providerCell);
    row.appendChild(account_numCell);
    row.appendChild(expiryCell);
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.userpayment_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Start of new Step 8 code for adding new data to the dropdown menu for updating userpayment
    
    // Find drop down menu, create a new option, fill data in the option,
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("input-customer_id-update");
    let option = document.createElement("option");
    option.text = customer_id;
    option.value = newRow.customer_id;
    selectMenu.add(option);
    // End of new step 8 code.
}