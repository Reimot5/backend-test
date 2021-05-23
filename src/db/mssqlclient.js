/**
 * @version : 0.0.0.1
 */

const sql = require("mssql");

class MSSqlClient {

	constructor({ server, database, user, password, options = { encrypt: false } }) {
		this.pool = new sql.ConnectionPool({ server, database, user, password, options });
		this.pool.close();
		this.transaction = null;
		this._g_connection_promise = null;
	}

	async Connect() {
		let self = this;
		if (self.pool.connected) {
			return Promise.resolve(self.pool);
		} else {
			if (self.pool.connecting)
				return self._g_connection_promise;
			else
				return self._g_connection_promise = self.pool.connect();
		}
	}

    /**
     * @param {String} query consulta que se va a ejecutar
     * @param {Object} inputParams parámetros de entrado(opcional)
     * @param {Object} outputParams parámetros de salida(opcional)
     * @param {Number} commandType MSSqlClient.CommandType
     */
	Exec(query, inputParams, outputParams, commandType) {
		let self = this;
		return new Promise(async (resolve, reject) => {
			try {

				await self.Connect();

				let request = self.pool.request();

				for (let k in inputParams)
					request.input(k, inputParams[k]);

				for (let k in outputParams)
					request.output(k, outputParams[k]);

				let result = await (commandType === MSSqlClient.CommandType.StoredProcedure ? request.execute(query) : request.query(query));

				resolve(result);

			} catch (error) {
				reject(error);
			}
		});
	}

    /**
     * @param {String} name nombre procedimiento almacenado
     * @param {Object} inputParams parámetros de entrado(opcional)
     * @param {Object} outputParams parámetros de salida(opcional)
     */
	async StoredProcedure(name, inputParams, outputParams) {
		return this.Exec(name, (inputParams || null), (outputParams || null), MSSqlClient.CommandType.StoredProcedure);
	}

    /**
     * @param {String} name nombre procedimiento almacenado
     * @param {Object} inputParams parámetros de entrado(opcional)
     * @param {Object} outputParams parámetros de salida(opcional)
     */
	async Query(name, inputParams, outputParams) {
		return this.Exec(name, (inputParams || null), (outputParams || null), MSSqlClient.CommandType.Text);
	}


	async BeginTransaction() {
		await this.Connect();

		this.transaction = await new sql.Transaction(this.pool);

		await this.transaction.begin();

		return new sql.Request(this.transaction)
	}

    /**
     *  @returns {void}
     */
	async CommitTransaction() {
		var self = this;
		if (self.transaction === null) {
			return Promise.reject("'transaction' is null");
		} else {
			return new Promise((resolve, reject) => {
				self.transaction.commit(err => {
					if (err)
						reject(err);
					else
						resolve();
				});
			});
		}
	}

    /**
     *  @returns {void}
     */
	async RollbackTransaction() {
		var self = this;
		if (self.transaction === null) {
			return Promise.reject("'transaction' is null");
		} else {
			return new Promise((resolve, reject) => {
				self.transaction.rollback(err => {
					if (err)
						reject(err);
					else
						resolve();
				});
			});
		}
	}
}

MSSqlClient.CommandType = Object.freeze({
	Text: 1,
	StoredProcedure: 2,
});

module.exports = ({ server, database, user, password, options }) => {
	return new MSSqlClient({ server, database, user, password, options });
};
