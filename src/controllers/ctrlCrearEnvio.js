const { crearUnEnvio } = require("../services/srvcCrearEnvio")

module.exports = (() => {
	return {
		crearEnvio() {
			return new Promise(async (resolve, reject) => {
				try {
                    let result = await crearUnEnvio()
                    resolve(result)
				} catch (error) {
					console.log(error)
					reject(error)
				}
			})
		},
	}
})();
