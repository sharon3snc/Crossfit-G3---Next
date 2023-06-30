CREATE DATABASE crossfit3g;
GRANT ALL PRIVILEGES ON crossfit3g.* TO 'root'@'localhost';
use crossfit3g;

CREATE TABLE clients (
  client_id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  birthdate DATE NOT NULL,
  phone VARCHAR(255) NOT NULL,
  inscription_date DATE NOT NULL,
  emergency_contact VARCHAR(255) NOT NULL,
  emergency_phone VARCHAR(255) NOT NULL,
  rate_id INT,
  available_classes INT
);

CREATE TABLE employees (
  employee_id INT AUTO_INCREMENT PRIMARY KEY,
  password VARCHAR(255) NOT NULL,
  user_admin BOOLEAN NOT NULL,
  name VARCHAR(255) NOT NULL,
  surname VARCHAR(255) NOT NULL,
  birthdate DATE NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL
);

INSERT INTO clients (email, password, name, surname, birthdate, phone, inscription_date, emergency_contact, emergency_phone, rate_id, available_classes)
VALUES ('maria@gmail.com', '12345', 'Maria', 'Hurtado', '1990-01-01', '1234567890', '2023-06-29', 'Jane Doe', '9876543210', 1, 5);


INSERT INTO clients (email, password, name, surname, birthdate, phone, inscription_date, emergency_contact, emergency_phone, rate_id, available_classes)
VALUES ('jose@gmail.com', '12345', 'Jose', 'Rodriguez', '1992-01-01', '1234567890', '2023-06-29', 'Jane Doe', '9876543210', 1, 5);

select * from clients;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345';