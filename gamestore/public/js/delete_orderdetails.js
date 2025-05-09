//delete_orderdetails.js
//     Citation for the following function:
//     Date: 2/28/2024
//     Copied from /OR/ Adapted from /OR/ Based on:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//

function deleteOrderDetails(orderdetails_id) {
    let link = '/delete-orderdetails-ajax/';
    let data = {
      id: orderdetails_id
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(orderdetails_id);
      }
    });
  }

  function deleteRow(orderdetails_id){
      let table = document.getElementById("orderdetails-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == orderdetails_id) {
              table.deleteRow(i);
              break;
         }
      }
  }