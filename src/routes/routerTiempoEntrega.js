const router = require("express").Router()
const { calcularTiempoEntrega } = require('../controllers/ctrlTiempoEntrega')

router.get('/', async (req, res) => {
	try {
		let result = calcularTiempoEntrega()
		res.send(result)
	} catch (error) {
		res.status(500).send('error')
		console.log(error)
	}
})

module.exports = router;
