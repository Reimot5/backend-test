const router = require("express").Router()
const { getFiboDiviBy1000thPlus } = require("../controllers/ctrlFibonacci")

router.get('/', (req, res) => {
	try {
		let result = getFiboDiviBy1000thPlus()
		res.json(result)
	} catch (error) {
		res.status(500).send('error')
		console.log(error)
	}
})

module.exports = router;
