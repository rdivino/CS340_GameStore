//delete_customer.js
//     Citation for the following function:
//     Date: 2/28/2024
//     Copied from /OR/ Adapted from /OR/ Based on:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//

function deleteCustomer(customer_id) {
    let link = '/delete-customer-ajax/';
    let data = {
      id: customer_id
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(customer_id);
      }
    });
  }

function deleteRow(customer_id){

  let table = document.getElementById("customer-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
     //iterate through rows
     //rows would be accessed using the "row" variable assigned in the for loop
     if (table.rows[i].getAttribute("data-value") == customer_id) {
          table.deleteRow(i);
          deleteDropDownMenu(customer_id);
          break;
     }
  }
}


function deleteDropDownMenu(customer_id){
let selectMenu = document.getElementById("mySelect");
for (let i = 0; i < selectMenu.length; i++){
  if (Number(selectMenu.options[i].value) === Number(customer_id)){
    selectMenu[i].remove();
    break;
  } 

}
}
