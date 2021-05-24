const router = require("express").Router()
const { getEmployees, createEmployee, updateEmployee, deleteEmployee } = require("../controllers/ctrlCrud")

router.get('/get-employees', async (req, res) => {
	try {
		let result = await getEmployees()
		res.send(result)
	} catch (error) {
		res.status(500).send('error')
		console.log(error)
	}
})

router.post('/create-employee', async (req, res) => {
	let { first_name, last_name, job_title, age, email } = req.body
	try {
		let result = await createEmployee({ first_name, last_name, job_title, age, email })
		if (result == 'Parametros incorrectos') {
			res.status(400).send('Por favor revise la informacion enviada')
		} else {
			res.send(result)
		}
	} catch (error) {
		res.status(500).send('error')
		console.log(error)
	}
})

router.patch('/update-employee', async (req, res) => {
	let { id, first_name, last_name, job_title, age, email } = req.body
	try {
		let result = await updateEmployee({ id, first_name, last_name, job_title, age, email })
		if (result == 'Parametros incorrectos') {
			res.status(400).send('Por favor revise la informacion enviada')
		} else {
			res.send(result)
		}
	} catch (error) {
		res.status(500).send('error')
		console.log(error)
	}
})

router.delete('/delete-employee', async (req, res) => {
	let { id } = req.body
	try {
		let result = await deleteEmployee(id)
		if (result == 'Parametros incorrectos') {
			res.status(400).send('Por favor revise la informacion enviada')
		} else {
			res.send(result)
		}
	} catch (error) {
		res.status(500).send('error')
		console.log(error)
	}
})

module.exports = router;
