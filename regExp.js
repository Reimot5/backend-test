module.exports = {
	dniRegEx: /^[0-9]{6,9}$/,
	celularRegEx: /^[1-9]{2,4}[4-6]{1}\d{6,7}$/,
	sexoRegEx: /^[MF]{1}$/i,
	emailRegEx: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
	passwordRegEx: /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
	uidFbRegEx: /^([0-9a-z]){28}$/i,
	uidRegEx: /[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/i,
	idRegEx: /^\d+$/,
	fechaRegEx: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/, //solo fecha en formato string con guiones
	fechaYHoraRegEx: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]) (?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)\.000)/,
	mesOdiaRegEx: /^(0?[1-9]|1[012])$/,
	anioRegEx: /^\d{4}$/,
	matriculaRegEx: /^[0-9A-Za-z]{4}$/,
	especialidadRegEx: /^\d{2}$/
}
