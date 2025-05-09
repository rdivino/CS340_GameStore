//add_product.js
//     Citation for the following function:
//     Date: 2/28/2024
//     Copied from /OR/ Adapted from /OR/ Based on:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//

// Get the objects we need to modify
let addCustomerForm = document.getElementById('add-product-form-ajax');

// Modify the objects we need
addCustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTitle = document.getElementById("input-title");
    let inputDescription = document.getElementById("input-description");
    let inputGenre = document.getElementById("input-genre");
    let inputReleaseDate = document.getElementById("input-release_date");
    let inputPrice = document.getElementById("input-price");
    let inputDiscountID = document.getElementById("input-discount_id");

    // Get the values from the form fields
    let titleValue = inputTitle.value;
    let descriptionValue = inputDescription.value;
    let genreValue = inputGenre.value;
    let release_dateValue = inputReleaseDate.value;
    let priceValue = inputPrice.value;
    let discount_idValue = inputDiscountID.value;

    // Put our data we want to send in a javascript object
    let data = {
        title: titleValue,
        description: descriptionValue,
        genre: genreValue,
        release_date: release_dateValue,
        price: priceValue,
        discount_id: discount_idValue
    }

    console.log(data);
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-product-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputTitle.value = '';
            inputDescription.value = '';
            inputGenre.value = '';
            inputReleaseDate.value = '';
            inputPrice.value = '';
            inputDiscountID.value = '';
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
    let currentTable = document.getElementById("product-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let product_idCell = document.createElement("TD");
    let titleCell = document.createElement("TD");
    let descriptionCell = document.createElement("TD");
    let genreCell = document.createElement("TD");
    let release_dateCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let discount_idCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    product_idCell.innerText = newRow.product_id;
    titleCell.innerText = newRow.title;
    descriptionCell.innerText = newRow.description;
    genreCell.innerText = newRow.genre;
    release_dateCell.innerText = newRow.release_date;
    priceCell.innerText = newRow.price;
    discount_idCell.innerText = newRow.discount_id;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteProduct(newRow.product_id);
    };

    // Add the cells to the row 
    row.appendChild(product_idCell);
    row.appendChild(titleCell);
    row.appendChild(descriptionCell);
    row.appendChild(genreCell);
    row.appendChild(release_dateCell);
    row.appendChild(priceCell);
    row.appendChild(discount_idCell);
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.product_id);

    // Add the row to the table
    currentTable.appendChild(row);
}