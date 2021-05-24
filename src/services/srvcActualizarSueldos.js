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
		}
	}
})();
