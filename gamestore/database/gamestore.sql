-- Group 65

-- Disables foreign key checks and commits
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- drops table if it exists
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Products; 
DROP TABLE IF EXISTS Discounts;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS OrderDetails;
DROP TABLE IF EXISTS UserPayments;


-- Create Discounts Table
CREATE TABLE Discounts(
    discount_id int NOT NULL AUTO_INCREMENT,
    discount_name varchar(50) NOT NULL,
    percent decimal(5,2) NOT NULL,
    duration varchar(50) NOT NULL,
    active boolean NOT NULL,
    PRIMARY KEY (discount_id)
);

-- Create Customers Table
CREATE TABLE Customers(
    customer_id int NOT NULL AUTO_INCREMENT,
    email varchar(50) NOT NULL,
    password varchar(50) NOT NULL,
    phone varchar(15),
    PRIMARY KEY (customer_id)
);

-- Create Products Table
CREATE TABLE Products(
    product_id int NOT NULL AUTO_INCREMENT,
    title varchar(50) NOT NULL,
    description varchar(255) NOT NULL,
    genre varchar(50) NOT NULL,
    release_date datetime NOT NULL,
    price decimal(19,2),
    discount_id int,
    PRIMARY KEY (product_id),
    FOREIGN KEY(discount_id) REFERENCES Discounts(discount_id)
    ON DELETE SET NULL
);

-- Create Orders Table
CREATE TABLE Orders (
    order_id int NOT NULL AUTO_INCREMENT,
    customer_id int,
    total decimal(19,2) NOT NULL,
    PRIMARY KEY (order_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
    ON DELETE CASCADE
);

-- Create OrderDetails Table
CREATE TABLE OrderDetails (
    orderdetails_id int NOT NULL AUTO_INCREMENT,
    order_id int,
    product_id int,
    PRIMARY KEY (orderdetails_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
    ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
    ON DELETE CASCADE
);

-- Create UserPayments Table
CREATE TABLE UserPayments(
    userpayment_id int NOT NULL AUTO_INCREMENT,
    customer_id int,
    payment_type varchar(50) NOT NULL,
    provider varchar(50) NOT NULL,
    account_num varchar(20) NOT NULL, 
    expiry datetime NOT NULL,
    PRIMARY KEY (userpayment_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
    ON DELETE CASCADE
);

-- adds discount/sale information to Discounts table
INSERT INTO Discounts(
    discount_id, discount_name, percent, duration, active
)
VALUES 
(
    1, 'Black Friday', 0.35, '14 days', FALSE
),
(
    2, 'Winter Sale', 0.20,	'14 days', FALSE
),
(
    3, 'Spring Sale', 0.50, '7 days', FALSE
),
(
    4, 'Launch Sale', 0.10, '7 days', TRUE
),
(
    5, 'RPG Fest', 0.30, '14 days', TRUE
);

-- adds customer information to Customers table
INSERT INTO Customers (
    customer_id, email, password, phone
)
VALUES
(
    1, 'john@gmail.com', 'pass123', '123-456-7890'
),
(
    2, 'sarah@outlook.com', 'password456', '987-654-3210'

),
(
    3, 'mike@gmail.com', 'mypass789', '111-222-3333'

),
(
    4, 'emily@school.com', 'hunter2', NULL

),
(
    5, 'david@gmail.com', 'qwerty123', '555-555-5555'

);

-- adds product information to Products table
INSERT INTO Products(
    product_id, title, description, genre, release_date, price, discount_id
)
VALUES 
(
    1, 'Buddyworld', 'Open world creature-collector game.',	'Adventure', '2024-01-18', 29.99, 4
),
    
(
    2, 'Sundew Valley', 'Pixel farming-simulator RPG game.', 'Farming Sim',	'2016-02-26', 14.99, NULL 
),
(
    3, 'Baldur''s Door 3', 'RPG game set in Dungeons & Dragons universe.', 'RPG', '2023-08-03', 59.99, 5
),
(
    4, 'ELDERLY RING', 'Difficult fantasy-action RPG game', 'Souls-like', '2022-02-24', 59.99, NULL
),
(
    5, 'Summit Legends', 'MMO Battle-Royale FPS game', 'Battle Royale',	'2020-11-04', 0.00, NULL
);

-- adds customer id and total to Orders table
INSERT INTO Orders(
    order_id, customer_id, total
)
VALUES
(
    1, 1, 41.99 
),
(
    2, 2, 0.00   

),
(
    3, 3, 14.99 

),
(
    4, 4, 26.99 

),
(
    5, 5, 59.99 
);

-- adds order id and product id to OrderDetails table
INSERT INTO OrderDetails(
    orderdetails_id, order_id, product_id
)
VALUES 
(
    1, 1, 3 

),
(
    2, 2, 5  

),
(
    3, 3, 2

),
(
    4, 4, 1

),
(
    5, 5, 4 

);

-- adds customer payment information to UserPayments table
INSERT INTO UserPayments(
    userpayment_id, customer_id, payment_type, provider, account_num, expiry
)
VALUES
(
    1, 1, 'Credit Card', 'American Express', '1234567890123456', '2026-02-01'

),
(
    2, 2, 'PayPal', 'PayPal Inc.', '9876543210123456','2029-06-01'

),
(
    3, 3, 'Credit Card',	'Visa', '5555666677778888', '2027-09-01'

),
(
    4, 4, 'Debit Card', 'MasterCard', '1111222233334444', '2025-04-01'
),
(
    5, 5, 'Credit Card', 'Discover', '4444333322221111', '2029-11-01'
);

-- save changes
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;