//los servicios se usan para conectar con base de datos u otras apis

var _sqlClient = null;

module.exports = (() => {
    return {
        init({ sqlClient }) { //siempre va esta funcion cuando se usa la base de datos
            _sqlClient = sqlClient;
        },
        /**
         * @param {object} param0
         * @param {number} param0.idTurno ejemplo comentario
         * @param {number} param0.estado ejemplo comentario
         * @returns {Promise<void>}
         */
        setEstadoTurno({ idTurno, estado }) {
            return new Promise(async (resolve, reject) => {
                try {
                    let result = (await _sqlClient.Query("SELECT CONVERT(VARCHAR(10),Turno_Inicio,112) as FechaTurno from Turnos where IdTurno=@idTurno AND Anulado=0", { idTurno })).recordset;
                    if (!result.length) {
                        reject({ status: 400, message: `No se encontraron coincidencias para [IdTurno=${idTurno}]` });
                        return;
                    }

                    let resultt = (await _sqlClient.StoredProcedure("Turnos_ActualizarEstado", { idTurno, estado }));
                    if ((!resultt.recordset.length) || ((resultt.recordset[0].actualizado == 0) && resultt.recordset[0].errorDatos == 0)) {
                        reject({ status: 400, message: "No se pudo actualizar el turno." })
                        return;
                    }
                    if ((resultt.recordset.length) && (resultt.recordset[0].errorDatos == 1)) {
                        reject({ status: 400, message: "Datos invalidos" })
                        return;
                    }

                    resolve();

                } catch (e) {
                    reject(typeof e === "string" ? e : (e.message));
                }
            });
        }
    }
})();