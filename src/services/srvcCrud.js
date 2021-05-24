const { pool } = require("../db/mysqlclient");

module.exports = (() => {
	return {
		/**
		 * @returns {Promise<Array>}
		 */
		getAllEmployees() {
			return new Promise(async (resolve, reject) => {
				try {
					let result = await pool.execute('SELECT * FROM company_employees');
					resolve(result);
				} catch (error) {
					console.log(error)
					reject(error);
				}
			});
		},
        /**
		 * @returns {Promise<any>}
		 */
		createOneEmployee({ first_name, last_name, job_title, age, email }) {
			return new Promise(async (resolve, reject) => {
				try {
					let result = await pool.query('INSERT INTO company_employees SET ?', { first_name, last_name, job_title, age, email });
					resolve(result);
				} catch (error) {
					console.log(error)
					reject(error);
				}
			});
		},
        /**
		 * @returns {Promise<any>}
		 */
		updateOneEmployee({ id, parameters }) {
			return new Promise(async (resolve, reject) => {
				try {
					let result = await pool.query('UPDATE company_employees SET ? WHERE ?', [parameters, { id }]);
					resolve(result);
				} catch (error) {
					console.log(error)
					reject(error);
				}
			});
		},
        /**
		 * @returns {Promise<any>}
		 */
		deleteOneEmployee(id) {
			return new Promise(async (resolve, reject) => {
				try {
					let result = await pool.query('DELETE FROM company_employees WHERE ?', { id });
					resolve(result);
				} catch (error) {
					console.log(error)
					reject(error);
				}
			});
		}
	}
})();
