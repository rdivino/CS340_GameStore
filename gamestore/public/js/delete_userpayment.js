//delete_userpayment.js
//     Citation for the following function:
//     Date: 3/6/2024
//     Copied from /OR/ Adapted from /OR/ Based on:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
//

function deleteUserPayment(userpayment_id) {
    let link = '/delete-userpayment-ajax/';
    let data = {
      id: userpayment_id
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(userpayment_id);
      }
    });
  }
  
  function deleteRow(userpayment_id){
      let table = document.getElementById("userpayment-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == userpayment_id) {
              table.deleteRow(i);
              break;
         }
      }
  }

  
  function deleteDropDownMenu(userpayment_id){
    let selectMenu = document.getElementById("input-userpayment_id-update");
    for (let i = 0; i < selectMenu.length; i++){
      if (Number(selectMenu.options[i].value) === Number(userpayment_id)){
        selectMenu[i].remove();
        break;
      } 
    }
  }