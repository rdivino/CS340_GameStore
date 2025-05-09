// App.js
//     Citation for the following function:
//     Date: 2/28/2024
//     Copied from /OR/ Adapted from /OR/ Based on:
//     Source URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app/tree/main
/*
    SETUP
*/
// Express
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))

PORT        = 19023;                 // Set a port number at the top so it's easy to change in the future

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Static files
app.use(express.static('public'));
/*
    ROUTES
*/

// GET

app.get('/', function (req, res) {
    res.render('index');
});        

app.get('/products', function(req, res)
    {   
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.title === undefined)
    {
        query1 = "SELECT * FROM Products;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Products WHERE title LIKE "${req.query.title}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM Discounts;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the product
        let product = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the discount
            let discount = rows;

            return res.render('products', {data: product, discount: discount});
        })    
    })                                                 
});    

app.get('/discounts', function(req, res)
    {  
        let query1 = "SELECT * FROM Discounts;";      
        
        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields){

        
            return res.render('discounts', {data: rows,});                  
    })                                                 
});     

app.get('/customers', function(req, res)
    {  
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.email === undefined)
    {
        query1 = "SELECT * FROM Customers;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM Customers WHERE email LIKE "${req.query.email}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM UserPayments;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the customers
        let customers = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the userpayment
            let userpayment = rows;

            return res.render('customers', {data: customers, userpayment: userpayment});
        })    
    })                                                 
});   



app.get('/orders', function(req, res)
    {  
        let query1 = "SELECT * FROM Orders;";      
        
        // Query 2 is the same in both cases
        let query2 = "SELECT * FROM Customers;";

        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields){

        // Save the orders
            let order_id = rows;

        // Run the second query
            db.pool.query(query2, (error, rows, fields) => {

                // Save the customers
                let title = rows;
                return res.render('orders', {data: order_id, title: title});                 
        })    
    })                                                 
});   

app.get('/orderdetails', function(req, res)
    {  
        let query1 = "SELECT * FROM OrderDetails;";      
        
        let query2 = "SELECT * FROM Orders;";

        let query3 = "SELECT * FROM Products;";

        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields){

            let orderdetails = rows;

            // Run the 2nd query
            db.pool.query(query2, (error, rows, fields) => {

                let orders = rows;

                // Run 3rd query
                db.pool.query(query3, (error, rows, fields) => {

                    let products = rows;
                    return res.render('orderdetails', {data: orderdetails, orders: orders, products: products});    
            })              
        })    
    })                                                 
});   

app.get('/userpayments', function(req, res)
    {  
        let query1 = "SELECT * FROM UserPayments;";      
        
        // Query 2 is the same in both cases
        let query2 = "SELECT * FROM Customers;";

        // Run the 1st query
        db.pool.query(query1, function(error, rows, fields){

        // Save the userpayment
            let userpayment = rows;

        // Run the second query
            db.pool.query(query2, (error, rows, fields) => {

                // Save the customers
                let customers = rows;
                return res.render('userpayments', {data: userpayment, customers: customers});                 
        })    
    })                                                 
});   
    
    
// POST
app.post('/add-product-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let discount_id = parseInt(data.discount_id);
    if (isNaN(discount_id)){
        discount_id = null;
    }
    
    // Create the query and run it on the database
    query1 = `INSERT INTO Products (title, description, genre, release_date, price, discount_id) VALUES ('${data.title}', '${data.description}', '${data.genre}', '${data.release_date}', '${data.price}', '${discount_id}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Products
            query2 = `SELECT * FROM Products;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-discount-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Discounts (discount_id, discount_name, percent, duration, active) VALUES ('${data.discount_id}', '${data.discount_name}', '${data.percent}', '${data.duration} days', '${data.active}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Discounts
            query2 = `SELECT * FROM Discounts;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-customer-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Capture NULL values
    let phone = parseInt(data.phone);
    if (isNaN(phone))
    {
        phone = ''
    }


    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (customer_id, email, password, phone) VALUES ('${data.customer_id}', '${data.email}', '${data.password}', '${phone}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Customers
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-order-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO Orders (order_id, customer_id, total) VALUES ('${data.order_id}', '${data.customer_id}', '${data.total}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Orders
            query2 = `SELECT * FROM Orders;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-orderdetails-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO OrderDetails (orderdetails_id, order_id, product_id) VALUES ('${data.orderdetails_id}', '${data.order_id}', '${data.product_id}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on Orders
            query2 = `SELECT * FROM OrderDetails;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

app.post('/add-userpayment-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    query1 = `INSERT INTO UserPayments (userpayment_id, customer_id, provider, payment_type, account_num, expiry) VALUES ('${data.userpayment_id}', '${data.customer_id}', '${data.payment_type}', '${data.provider}', '${data.account_num}', '${data.expiry}')`;
    db.pool.query(query1, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            // If there was no error, perform a SELECT * on UserPayments
            query2 = `SELECT * FROM UserPayments;`;
            db.pool.query(query2, function(error, rows, fields){

                // If there was an error on the second query, send a 400
                if (error) {
                    
                    // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                    console.log(error);
                    res.sendStatus(400);
                }
                // If all went well, send the results of the query back.
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// DELETE
app.delete('/delete-product-ajax', function(req,res,next){
    let data = req.body;
    let product_id = parseInt(data.id);
    let deleteProduct= `DELETE FROM Products WHERE product_id = ?`;
        // Run the 1st query
        db.pool.query(deleteProduct, [product_id], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deleteProduct, [product_id], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
  })});

  app.delete('/delete-discount-ajax/', function(req,res,next){
    let data = req.body;
    let discount_id = parseInt(data.id);
    let deleteDiscount = `DELETE FROM Discounts WHERE discount_id = ?`;
        // Run the 1st query
        db.pool.query(deleteDiscount, [discount_id], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deleteDiscount, [discount_id], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
  })});

  app.delete('/delete-customer-ajax/', function(req,res,next){
    let data = req.body;
    let customer_id = parseInt(data.id);
    let deleteCustomers= `DELETE FROM Customers WHERE customer_id = ?`;
        // Run the 1st query
        db.pool.query(deleteCustomers, [customer_id], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deleteCustomers, [customer_id], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
  })});


  app.delete('/delete-order-ajax/', function(req,res,next){
    let data = req.body;
    let order_id = parseInt(data.id);
    let deleteOrder = `DELETE FROM Orders WHERE order_id = ?`;
        // Run the 1st query
        db.pool.query(deleteOrder, [order_id], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deleteOrder, [order_id], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
  })});

  app.delete('/delete-orderdetails-ajax/', function(req,res,next){
    let data = req.body;
    let orderdetails_id = parseInt(data.id);
    let deleteOrderDetails = `DELETE FROM OrderDetails WHERE orderdetails_id = ?`;
        // Run the 1st query
        db.pool.query(deleteOrderDetails, [orderdetails_id], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deleteOrderDetails, [orderdetails_id], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
  })});

  app.delete('/delete-userpayment-ajax/', function(req,res,next){
    let data = req.body;
    let userpayment_id = parseInt(data.id);
    let deleteUserPayment = `DELETE FROM UserPayments WHERE userpayment_id = ?`;
        // Run the 1st query
        db.pool.query(deleteUserPayment, [userpayment_id], function(error, rows, fields){
            if (error) {
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

            else
            {
                // Run the second query
                db.pool.query(deleteUserPayment, [userpayment_id], function(error, rows, fields) {

                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    } else {
                        res.sendStatus(204);
                    }
                })
            }
  })});


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});

// EDIT

  app.put('/put-customer-ajax', function(req,res,next){
    let data = req.body;
  
    let customer_id = parseInt(data.customer_id);
    let email = data.email;
    let password = data.password;
    let phone = data.phone;
  
    let queryUpdateCustomer = `UPDATE Customers SET email = ?, password = ?, phone = ? WHERE customer_id = ?`;
    let selectCustomer = `SELECT * FROM Customers;`

    // Run the 1st query
    db.pool.query(queryUpdateCustomer, [email, password, phone, customer_id], function(error, rows, fields){
        if (error) {

        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error);
        res.sendStatus(400);
        }

        // If there was no error, we run our second query and return that data so we can use it to update the customers's
        // table on the front-end
        else
        {
            // Run the second query
            db.pool.query(selectCustomer, function(error, rows, fields) {

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
        })
    }
})});

app.put('/put-userpayment-ajax', function(req,res,next){
    let data = req.body;
  
    let userpayment_id = parseInt(data.userpayment_id)
    let customer_id = parseInt(data.customer_id);
    let payment_type = data.payment_type;
    let provider = data.provider;
    let account_num = parseInt(data.account_num);
    let expiry = data.expiry;

    let queryUpdateUserPayment = `UPDATE UserPayments SET customer_id = ?, payment_type = ?, provider = ?, account_num = ?, expiry = ? WHERE userpayment_id = ?`;
    let selectUserPayment = `SELECT * FROM UserPayments;`
  
          // Run the 1st query
          db.pool.query(queryUpdateUserPayment, [customer_id, payment_type, provider, account_num, expiry, userpayment_id], function(error, rows, fields){
              if (error) {
  
              // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
              console.log(error);
              res.sendStatus(400);
              }
  
              // If there was no error, we run our second query and return that data so we can use it to update the userpayment
              // table on the front-end
              else
              {
                  // Run the second query
                  db.pool.query(selectUserPayment, function(error, rows, fields) {
  
                      if (error) {
                          console.log(error);
                          res.sendStatus(400);
                      } else {
                          res.send(rows);
                      }
                  })
              }
  })});
