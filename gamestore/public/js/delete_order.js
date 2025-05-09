//delete_order.js
//     Citation for the following function:
//     Date: 2/28/2024
//     Copied from /OR/ Adapted from /OR/ Based on:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//

function deleteOrder(order_id) {
    let link = '/delete-order-ajax/';
    let data = {
      id: order_id
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(order_id);
      }
    });
  }

  
  function deleteRow(order_id){
      let table = document.getElementById("order-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == order_id) {
              table.deleteRow(i);
              break;
         }
      }
  }