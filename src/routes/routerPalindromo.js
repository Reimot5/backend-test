const router = require("express").Router()
const { getPalindromo } = require("../controllers/ctrlPalindromo")

router.get('/', (req, res) => {
	try {
		let result = getPalindromo()
		res.send(result)
	} catch (error) {
		res.status(500).send('error')
		console.log(error)
	}
})

module.exports = router;
