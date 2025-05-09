//update_userpayment.hbs
//     Citation for the following function:
//     Date: 5/6/2024
//     Copied from /OR/ Adapted from /OR/ Based on:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main 

// Get the objects we need to modify
let updateUserPaymentForm = document.getElementById('update-userpayment-form-ajax');

// Modify the objects we need
updateUserPaymentForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputUserPayment_id = document.getElementById("input-userpayment_id-update");
    let inputCustomer_id = document.getElementById("input-customer_id-update");
    let inputPaymentType = document.getElementById("input-payment_type-update");
    let inputProvider = document.getElementById("input-provider-update");
    let inputAccountNum = document.getElementById("input-account_num-update");
    let inputExpiry = document.getElementById("input-expiry-update");

    // Get the values from the form fields
    let userpayment_idValue = inputUserPayment_id.value;
    let customer_idValue = inputCustomer_id.value;
    let payment_typeValue = inputPaymentType.value;
    let providerValue = inputProvider.value;
    let account_numValue = inputAccountNum.value;
    let expiryValue = inputExpiry.value;
    
    // currently the database table for userpayments does not allow updating values to NULL
    // so we must abort if being bassed NULL for customer_id

    if (isNaN(customer_idValue)) 
    {
        return;
    }


    // Put our data we want to send in a javascript object
    let data = {
        userpayment_id: userpayment_idValue,
        customer_id: customer_idValue,
        payment_type: payment_typeValue,
        provider: providerValue,
        account_num: account_numValue,
        expiry: expiryValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-userpayment-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, customer_idValue);

            // reload page
            location.reload();

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, userpayment_id){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("userpayment-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == userpayment_id) {

            // Get the location of the row where we found the matching userpayment ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of userpayment value
            let customer_idTd = updateRowIndex.getElementsByTagName("td")[1];
            let payment_typeTd = updateRowIndex.getElementsByTagName("td")[2];
            let providerTd = updateRowIndex.getElementsByTagName("td")[3];
            let account_numTd = updateRowIndex.getElementsByTagName("td")[4];
            let expiryTd = updateRowIndex.getElementsByTagName("td")[5];

            // Reassign userpayment to our value we updated to
            customer_idTd.innerHTML = parsedData[0].name; 
            payment_typeTd.innerHTML = parsedData[1].name;
            providerTd.innerHTML = parsedData[2].name;
            account_numTd.innerHTML = parsedData[3].name;
            expiryTd.innerHTML = parsedData[4].name;
       }
    }
}