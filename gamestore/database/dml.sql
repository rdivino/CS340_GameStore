-- Group 65
-- CRUD operations 
-- Query with colon values is used to denote variables that will have data for the backend programming language

-- get all Products
SELECT * FROM Products;

-- add new Products
INSERT INTO Products(title, description, genre, release_date, price, discount_id)
VALUES(:titleInput, :descriptionInput, :genreInput, :release_dateInput, :priceInput, :discount_idInput);

-- update an existing Product
UPDATE Products 
   SET title=:titleInput, description=:descriptionInput, genre=:genreInput, release_date=:release_dateInput, price=:priceInput, discount_id=:discount_idInput
   WHERE product_id = :product_id;

-- delete an existing Product
DELETE FROM Products WHERE Products.product_id= :product_id;

-- dropdown for Products*
SELECT product_id, title
FROM Products;



-- get all Customers
SELECT * FROM Customers;

-- add new Customers
INSERT INTO Customers(email, password, phone)
VALUES(:emailInput, :passwordInput, :phoneInput);

-- update an existing Customer
UPDATE Customers 
   SET email=:emailInput, password=:passwordInput, phone=:phoneInput
   WHERE customer_id = :customer_id;

-- delete an existing Customer
DELETE FROM Customers WHERE customer_id = :customer_id;



-- get all Discounts 
SELECT * FROM Discounts;

-- add new Discounts
INSERT INTO Discounts(discount_name, percent, duration, active)
VALUES(:discount_nameInput, :percentInput, :durationInput, :activeInput);

-- update existing Discounts
UPDATE Discounts
    SET discount_name=:discount_nameInput, percent=:percentInput, duration=:durationInput, active=:activeInput
    WHERE discount_id = :discount_id;

--delete an existing Discount
DELETE FROM Discounts WHERE discount_id= :discount_id;



-- get all Orders 
SELECT * FROM Orders;

-- add new Orders
INSERT INTO Orders(customer_id, total)
VALUES(:customer_idInput, :totalInput);

-- update existing Orders
UPDATE Orders
    SET customer_id=:customer_idInput, total=:totalInput
    WHERE order_id = :order_id;
    
-- delete an existing Order
DELETE FROM Orders WHERE order_id = :order_id;

--******NEW*****
-- get all OrderDetails
SELECT * FROM OrderDetails;

-- add new OrderDetails
INSERT INTO OrderDetails(order_id, product_id, quantity)
VALUES(:order_idInput, :product_idInput, :quantityInput);

-- update an existing OrderDetails
UPDATE OrderDetails
SET quantity = :quantityInput
WHERE order_id = :order_id AND product_id = :product_id;

-- delete an existing OrderDetails*
DELETE FROM OrderDetails
WHERE order_id = :order_id AND product_id = :product_id;



-- get all UserPayments 
SELECT * FROM UserPayments;

-- add new UserPayments
INSERT INTO UserPayments(customer_id, payment_type, provider, account_num, expiry)
VALUES(:customer_idInput, :payment_typeInput, :providerInput, :account_numInput, :expiryInput);

-- updating existing UserPayments
UPDATE UserPayments
    SET customer_id=:customer_idInput, payment_type=:payment_typeInput, provider=:providerInput, account_num=:account_numInput, expiry=:expiryInput
    WHERE userpayment_id = :userpayment_id;
    

-- delete an existing UserPayments
DELETE FROM UserPayments WHERE userpayment_id = :userpayment_id;


-- displays for OrderDetails
SELECT OrderDetails.order_id, Products.title, OrderDetails.quantity
FROM OrderDetails
JOIN Products ON OrderDetails.product_id = Products.product_id
