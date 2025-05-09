//delete_discount.js
//     Citation for the following function:
//     Date: 3/4/2024
//     Copied from /OR/ Adapted from /OR/ Based on:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//

function deleteDiscount(discount_id) {
    let link = '/delete-discount-ajax/';
    let data = {
      id: discount_id
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(discount_id);
      }
    });
  }

    //  code for deleteCustomer using regular javascript/xhttp
    // function deleteCustomer(customer_id) {
    //     // Put our data we want to send in a javascript object
    //     let data = {
    //         id: customer_id
    //     };
        
    //     // Setup our AJAX request
    //     var xhttp = new XMLHttpRequest();
    //     xhttp.open("DELETE", "/delete-customer-ajax", true);
    //     xhttp.setRequestHeader("Content-type", "application/json");

    //     // Tell our AJAX request how to resolve
    //     xhttp.onreadystatechange = () => {
    //         if (xhttp.readyState == 4 && xhttp.status == 204) {

    //             // Add the new data to the table
    //             deleteRow(customer_id);

    //         }
    //         else if (xhttp.readyState == 4 && xhttp.status != 204) {
    //             console.log("There was an error with the input.")
    //         }
    //     }
    //     // Send the request and wait for the response
    //     xhttp.send(JSON.stringify(data));
    // }
  
  
function deleteRow(discount_id){

  let table = document.getElementById("discount-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
     //iterate through rows
     //rows would be accessed using the "row" variable assigned in the for loop
     if (table.rows[i].getAttribute("data-value") == discount_id) {
          table.deleteRow(i);
          deleteDropDownMenu(discount_id);
          break;
     }
  }
}


function deleteDropDownMenu(discount_id){
let selectMenu = document.getElementById("mySelect");
for (let i = 0; i < selectMenu.length; i++){
  if (Number(selectMenu.options[i].value) === Number(discount_id)){
    selectMenu[i].remove();
    break;
  } 

}
}
