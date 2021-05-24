const { pool } = require("../db/mysqlclient");

module.exports = (() => {
	return {
		/**
		 * @returns {Promise<any>}
		 */
        actualizarSueldosEmpleados() {
			return new Promise(async (resolve, reject) => {
				try {
					let result = (await pool.execute(`UPDATE employees e
                        INNER JOIN countries cy on cy.id = e.country_id
                        INNER JOIN continents ct on ct.id = cy.continent_id
                        SET e.salary = ((e.salary + (ct.anual_adjustment * e.salary) / 100))
                        WHERE (e.salary <= 5000 AND e.id <> 0)
                    `))[0]
                    if (result.affectedRows == 0) {
                        resolve('Todos los sueldos estan por encima de 5000')
                    } else {
                        resolve('Sueldos actualizados con exito!')
                    }
				} catch (error) {
					console.log(error)
					reject(error);
				}
			});
		}
	}
})();
