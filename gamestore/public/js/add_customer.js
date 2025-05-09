//add_customer.js
//     Citation for the following function:
//     Date: 2/28/2024
//     Copied from /OR/ Adapted from /OR/ Based on:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//

// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-customer-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputEmail = document.getElementById("input-email");
    let inputPassword = document.getElementById("input-password");
    let inputPhone = document.getElementById("input-phone");

    // Get the values from the form fields
    let emailValue = inputEmail.value;
    let passwordValue = inputPassword.value;
    let phoneValue = inputPhone.value;

    // Put our data we want to send in a javascript object
    let data = {
        email: emailValue,
        password: passwordValue,
        phone: phoneValue
    }

    console.log(data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputEmail.value = '';
            inputPassword.value = '';
            inputPhone.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Customers
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("customer-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let customer_idCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let passwordCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    customer_idCell.innerText = newRow.customer_id;
    emailCell.innerText = newRow.email;
    passwordCell.innerText = newRow.password;
    phoneCell.innerText = newRow.phone;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteCustomer(newRow.customer_id);
    };

    // Add the cells to the row 
    row.appendChild(customer_idCell);
    row.appendChild(emailCell);
    row.appendChild(passwordCell);
    row.appendChild(phoneCell);
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.customer_id);

    // Add the row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let idMenu = document.getElementById("mySelect");
    let option = document.createElement("optionID");
    option.text = newRow.customer_id; // FIXED ID SHOWING IN DROPDOWN
    option.value = newRow.customer_id;
    idMenu.add(option);

    let emailMenu = document.getElementById("input-email-update");
    let emailOption = document.createElement("optionEmail");
    emailOption.text = newRow.email; 
    emailOption.value = newRow.email;
    emailMenu.add(emailOption);
}