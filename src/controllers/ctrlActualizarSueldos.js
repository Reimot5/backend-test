const { actualizarSueldosEmpleados } = require('../services/srvcActualizarSueldos')

module.exports = (() => {
    return {
        actualizarSueldos() {
            return new Promise(async (resolve, reject) => {
				try {
                    let result = await actualizarSueldosEmpleados()
                    resolve(result)
				} catch (error) {
					console.log(error)
					reject(error)
				}
			})
        },
    }
})();
