const router = require("express").Router()
const { crearEnvio } = require('../controllers/ctrlCrearEnvio')

router.get('/', async (req, res) => {
	try {
		let result = await crearEnvio()
		res.send(result)
	} catch (error) {
		res.status(500).send('error')
		console.log(error)
	}
})

module.exports = router;
