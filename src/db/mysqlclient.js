const mysql = require('mysql2/promise');
const { env } = require('../config')
var faker = require('faker');

const pool = mysql.createPool({
    host: env.dbHost,
    user: env.dbUser,
    password: env.dbPassword,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

async function startDB() {
    try {
        console.log("Conectando a base de datos...")
        await pool.execute('CREATE DATABASE IF NOT EXISTS backEndTest');
        const connection = await pool.getConnection()
        connection.changeUser({ database: 'backEndTest' })
        connection.execute(`CREATE TABLE IF NOT EXISTS company_employees (
			id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
			first_name VARCHAR(50),
			last_name VARCHAR(50),
			job_title VARCHAR(100),
			age INT,
			email VARCHAR(50)
		);`);

        //Ejercicio 7
        connection.execute(`CREATE TABLE IF NOT EXISTS countries (
            id int(10) unsigned NOT NULL AUTO_INCREMENT,
            continent_id int(11) NOT NULL,
            name varchar(25) NOT NULL,
            PRIMARY KEY (id)
        );`);
        connection.execute(`CREATE TABLE IF NOT EXISTS continents (
            id int(10) unsigned NOT NULL AUTO_INCREMENT,
            name varchar(25) NOT NULL,
            anual_adjustment int(11) NOT NULL,
            PRIMARY KEY (id)
        );`);
        connection.execute(`CREATE TABLE IF NOT EXISTS employees (
            id int(10) unsigned NOT NULL AUTO_INCREMENT,
            country_id int(11) NOT NULL,
            first_name varchar(25) NOT NULL,
            last_name varchar(25) NOT NULL,
            salary int(11) NOT NULL,
            PRIMARY KEY (id)
        );`);

        let continents = await connection.execute('SELECT * FROM continents');

        if (continents[0].length == 0) {
            connection.execute(`insert into continents values (null, 'América', 4);`);
            connection.execute(`insert into continents values (null, 'Europa', 5);`);
            connection.execute(`insert into continents values (null, 'Asia', 6);`);
            connection.execute(`insert into continents values (null, 'Oceanía', 6);`);
            connection.execute(`insert into continents values (null, 'Africa', 5);`);
        }

        let countries = await connection.execute('SELECT * FROM countries')

        if (countries[0].length == 0) {
            connection.execute(`insert into countries values (null, 1, 'Chile');`);
            connection.execute(`insert into countries values (null, 1, 'Argentina');`);
            connection.execute(`insert into countries values (null, 1, 'Canadá');`);
            connection.execute(`insert into countries values (null, 1, 'Colombia');`);
            connection.execute(`insert into countries values (null, 2, 'Alemania');`);
            connection.execute(`insert into countries values (null, 2, 'Francia');`);
            connection.execute(`insert into countries values (null, 2, 'España');`);
            connection.execute(`insert into countries values (null, 2, 'Grecia');`);
            connection.execute(`insert into countries values (null, 3, 'India');`);
            connection.execute(`insert into countries values (null, 3, 'Japón');`);
            connection.execute(`insert into countries values (null, 3, 'Corea del Sur');`);
            connection.execute(`insert into countries values (null, 4, 'Australia');`);
        }

        let employees = await connection.execute('SELECT * FROM employees')

        if (employees[0].length == 0) {
            connection.execute(`insert into employees values (null, 1, 'Pedro', 'Rojas', 2000);`);
            connection.execute(`insert into employees values (null, 2, 'Luciano', 'Alessandri', 2100);`);
            connection.execute(`insert into employees values (null, 3, 'John', 'Carter', 3050);`);
            connection.execute(`insert into employees values (null, 4, 'Alejandra', 'Benavides', 2150);`);
            connection.execute(`insert into employees values (null, 5, 'Moritz', 'Baring', 6000);`);
            connection.execute(`insert into employees values (null, 6, 'Thierry', 'Henry', 5900);`);
            connection.execute(`insert into employees values (null, 7, 'Sergio', 'Ramos', 6200);`);
            connection.execute(`insert into employees values (null, 8, 'Nikoleta', 'Kyriakopulu', 7000);`);
            connection.execute(`insert into employees values (null, 9, 'Aamir', 'Khan', 2000);`);
            connection.execute(`insert into employees values (null, 10, 'Takumi', 'Fujiwara', 5000);`);
            connection.execute(`insert into employees values (null, 11, 'Heung-min', 'Son', 5100);`);
            connection.execute(`insert into employees values (null, 12, 'Peter', 'Johnson', 6100);`);
        }

        connection.release();

        let result = await pool.execute('SELECT * FROM company_employees');
        if (result[0].length == 0) {
            for (let i = 0; i < 10; i++) {
                let first_name = faker.name.firstName();
                let last_name = faker.name.lastName();
                let job_title = faker.name.jobTitle();
                let email = faker.internet.email(first_name, last_name);
                let age = faker.datatype.number({ min: 18, max: 65 });
                await pool.query('INSERT INTO company_employees SET ?', { first_name, last_name, job_title, age, email });
            }
        }
        console.log("Conexion exitosa!")
    } catch (error) {
        console.log(error)
        console.log("No se pudo conectar con la base de datos")
    }
}

module.exports = { pool, startDB }
