//delete_product.js
//     Citation for the following function:
//     Date: 2/28/2024
//     Copied from /OR/ Adapted from /OR/ Based on:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//

function deleteProduct(product_id) {
    let link = '/delete-product-ajax/';
    let data = {
      id: product_id
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(product_id);
        // reload page
        location.reload();
      }
    });
  }


  
  function deleteRow(product_id){
      let table = document.getElementById("product-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == product_id) {
              table.deleteRow(i);
              break;
         }
      }
  }