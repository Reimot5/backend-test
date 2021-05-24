const { emailRegEx } = require("../regExp");
const { getAllEmployees, createOneEmployee, updateOneEmployee, deleteOneEmployee } = require("../services/srvcCrud")

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
		createEmployee({ first_name, last_name, job_title, age, email }) {
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
		},
		updateEmployee({ id, first_name, last_name, job_title, age, email }) {
			return new Promise(async (resolve, reject) => {
				try {
					if (typeof id === 'number' && id > 0) {
						let data = { first_name, last_name, job_title, age, email }
						let parameters = {}
						//chequeo que los elementos no sean vacios ni undefined
						for (const key in data) {
							if (Object.hasOwnProperty.call(data, key)) {
								const element = data[key];
								if (element !== undefined && element !== '') { parameters[key] = element }
							}
						}
						//si no hay parametros, se devuelve bad request
						if (Object.keys(parameters).length === 0) {
							resolve('Parametros incorrectos')
						} else {
							let result = await updateOneEmployee({ id, parameters })
							if (result[0].affectedRows > 0) {
								resolve('Empleado modificado correctamente')
							} else {
								resolve('No se pudo modificar el empleado')
							}
						}
					} else {
						resolve('Parametros incorrectos')
					}
				} catch (error) {
					console.log(error)
					reject(error)
				}
			})
		},
		deleteEmployee(id) {
			return new Promise(async (resolve, reject) => {
				try {
					if (typeof id === 'number' && id > 0) {
						let result = await deleteOneEmployee(id)
						if (result[0].affectedRows > 0) {
							resolve('Empleado eliminado correctamente')
						} else {
							resolve('No se pudo eliminar el empleado')
						}
					} else {
						resolve('Parametros incorrectos')
					}
				} catch (error) {
					console.log(error)
					reject(error)
				}
			})
		},
	}
})();
