const router = require("express").Router()
const { actualizarSueldos } = require('../controllers/ctrlActualizarSueldos')

router.get('/', async (req, res) => {
    try {
        let result = actualizarSueldos()
        res.send(result)
    } catch (error) {
        res.status(500).send('error')
        console.log(error)
    }
})

module.exports = router;
