const { pool } = require("../db/mysqlclient");

module.exports = (() => {
	return {
		/**
		 * @returns {Promise<Array>}
		 */
		getAllEmployees() {
			return new Promise(async (resolve, reject) => {
				try {
					let result = await pool.execute('SELECT * FROM employees');
					resolve(result);
				} catch (error) {
					console.log(error)
					reject(error);
				}
			});
		},
		createOneEmployee({ first_name, last_name, job_title, age, email }) {
			return new Promise(async (resolve, reject) => {
				try {
					let result = await pool.query('INSERT INTO employees SET ?', { first_name, last_name, job_title, age, email });
					resolve(result);
				} catch (error) {
					console.log(error)
					reject(error);
				}
			});
		},
		updateOneEmployee({ id, parameters }) {
			return new Promise(async (resolve, reject) => {
				try {
					let result = await pool.query('UPDATE employees SET ? WHERE ?', [parameters, { id }]);
					resolve(result);
				} catch (error) {
					console.log(error)
					reject(error);
				}
			});
		},
		deleteOneEmployee(id) {
			return new Promise(async (resolve, reject) => {
				try {
					let result = await pool.query('DELETE FROM employees WHERE ?', { id });
					resolve(result);
				} catch (error) {
					console.log(error)
					reject(error);
				}
			});
		}
	}
})();