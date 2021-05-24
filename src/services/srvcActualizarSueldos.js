const { pool } = require("../db/mysqlclient");

module.exports = (() => {
	return {
		/**
		 * @returns {Promise<Array>}
		 */
        actualizarSueldosEmpleados() {
			return new Promise(async (resolve, reject) => {
				try {
					let result = await pool.execute('SELECT * FROM company_employees');
					resolve(result);
				} catch (error) {
					console.log(error)
					reject(error);
				}
			});
		}
	}
})();
