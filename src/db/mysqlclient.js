const mysql = require('mysql2/promise');
var faker = require('faker');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
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
		connection.execute(`CREATE TABLE IF NOT EXISTS employees (
			id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
			first_name VARCHAR(50),
			last_name VARCHAR(50),
			job_title VARCHAR(100),
			age INT,
			email VARCHAR(50)
		)`);
		connection.release();
		let result = await pool.execute('SELECT * FROM employees');
		if (result[0].length == 0) {
			for (let i = 0; i < 10; i++) {
				let first_name = faker.name.firstName();
				let last_name = faker.name.lastName();
				let job_title = faker.name.jobTitle();
				let email = faker.internet.email(first_name, last_name);
				let age = faker.datatype.number({ min: 18, max: 65 });
				await pool.query('INSERT INTO employees SET ?', { first_name, last_name, job_title, age, email });
			}
		}
		console.log("Conexion exitosa!")
	} catch (error) {
		console.log(error)
		console.log("No se pudo conectar con la base de datos")
	}
}

module.exports = { pool, startDB }
