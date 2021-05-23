const { emailRegEx } = require("../regExp");
const { getAllEmployees, createOneEmployee } = require("../services/srvcCrud")

module.exports = (() => {
	return {
		getEmployees() {
			return new Promise(async (resolve, reject) => {
				try {
					let result = await getAllEmployees()
					resolve(result[0])
				} catch (error) {
					console.log(error)
					reject(error)
				}
			})
		},
		createEmployee({first_name, last_name, job_title, age, email}) {
			return new Promise(async (resolve, reject) => {
				try {
					if (typeof first_name === 'string' && first_name !== '' &&
						typeof last_name === 'string' && last_name !== '' &&
						typeof job_title === 'string' && job_title !== '' &&
						age >= 18 && age <= 65 &&
						emailRegEx.test(email)
					) {
						let result = await createOneEmployee({ first_name, last_name, job_title, age, email })
						console.log(result[0].affectedRows)
						if (result[0].affectedRows > 0) {
							resolve('Empleado creado correctamente')
						} else {
							resolve('No se pudo crear el empleado')
						}
					} else {
						resolve('Parametros incorrectos')
					}
				} catch (error) {
					console.log(error)
					reject(error)
				}
			})
		}
	}
})();
