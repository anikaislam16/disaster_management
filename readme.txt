Step 1:
--> Installing Necessary Software:
VS Code
Mysql Server
Step 2:
--> Open two terminals, one for Backend another for Frontend
--> Commands for initialization of Backend (server folder):
cd server
to install all the libraries- npm i

--> Command for starting server:
nodemon index

--> Commands for initialization of Frontend (client folder):
cd client
to install all the libraries- npm i

--> Command for starting client:
npm start

secret_key for admin registration: admin123@123


Necessary Database tables:
CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT,
    phone VARCHAR(20),
    address VARCHAR(255),
    location VARCHAR(255),
    status VARCHAR(50),
    password VARCHAR(255) NOT NULL
);

CREATE TABLE crisis (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    date DATETIME,
    isApproved TINYINT,
    location VARCHAR(255),
    severity ENUM('low', 'medium', 'high'), -- Adjust enum values as needed
    status ENUM('pending', 'resolved') -- Adjust enum values as needed
);

CREATE TABLE crisispictures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    crisis_id VARCHAR(255),
    picture_data LONGBLOB,
    FOREIGN KEY (crisis_id) REFERENCES crisis(id) ON DELETE CASCADE
);

CREATE TABLE donationmoney (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount INT,
    date DATETIME
);

CREATE TABLE purchase (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount VARCHAR(255),
    cost INT,
    date DATETIME
);

CREATE TABLE reliefdonation (
    id VARCHAR(255) PRIMARY KEY,
    amount VARCHAR(255),
    date DATETIME,
    location VARCHAR(255),
    type VARCHAR(255)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INT,
    phone VARCHAR(20),
    address VARCHAR(255),
    location VARCHAR(255),
    status VARCHAR(50),
    password VARCHAR(255) NOT NULL
);
