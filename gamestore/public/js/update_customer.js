//update_customer.js
//     Citation for the following function:
//     Date: 2/28/2024
//     Copied from /OR/ Adapted from /OR/ Based on:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//
// Get the objects we need to modify
let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomer_id = document.getElementById("mySelect");
    let inputEmail = document.getElementById("input-email-update");
    let inputPassword = document.getElementById("input-password-update");
    let inputPhone = document.getElementById("input-phone-update");

    // Get the values from the form fields
    let customer_idValue = inputCustomer_id.value
    let emailValue = inputEmail.value;
    let passwordValue = inputPassword.value;
    let phoneValue = inputPhone.value;
    
    
    if (isNaN(phoneValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        customer_id: customer_idValue,
        email: emailValue,
        password: passwordValue,
        phone: phoneValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, emailValue);

            //reload page
            location.reload();
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, customer_id){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("customer-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == customer_id) {

            // Get the location of the row where we found the matching customer ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of userpayment value
            let emailTd = updateRowIndex.getElementsByTagName("td")[1];
            let passwordTd = updateRowIndex.getElementsByTagName("td")[2];
            let phoneTd = updateRowIndex.getElementsByTagName("td")[3];
           
            // Reassign customer data to our value we updated to
            emailTd.innerHTML = parsedData[0].email;
            passwordTd.innerHTML = parsedData[1].password;
            phoneTd.innerHTML = parsedData[2].phone;
            log.console()
       }
    }
}
