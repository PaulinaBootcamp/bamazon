
DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;


USE bamazon_DB;

-- CREATE TABLE
CREATE TABLE products (
  item_ID INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(255) NOt NULL,
  price INT NOT NULL,
  qry INT NOT NULL,
  PRIMARY KEY (item_ID)
);


SELECT * FROM bamazon;
