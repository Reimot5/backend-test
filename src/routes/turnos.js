//Las rutas se usan para validaciones de datos y alguna logica pequeña, llamar al srvc si es necesario
//y devolver el resultado correspondiente a la peticion http

const router = require("express").Router()
const { idRegEx, fechaYHoraRegEx, uidFbRegEx, uidRegEx } = require("../regExp");
const srvcTurnos = require("../services/srvcTurnos")

router.get('/', async (req, res, next) => {
	let { idInstitucion, uidTutor, idRol = null, fechaDesde, fechaHasta } = req.query
	// if (!uidFbRegEx.test(uidTutor) && !uidRegEx.test(uidTutor)) {
})

module.exports = router;
