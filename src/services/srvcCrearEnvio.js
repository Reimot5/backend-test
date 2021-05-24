const { pool } = require("../db/mysqlclient");
const axios = require('axios')
const requestApiEnviame = require('../utils/requestApiEnviame.json')
const { env } = require('../config')

module.exports = (() => {
    return {
        /**
         * @returns {Promise<any>}
         */
        crearUnEnvio() {
            return new Promise(async (resolve, reject) => {
                try {
                    let options = {
                        method: 'post',
                        url: 'https://stage.api.enviame.io/api/s2/v2/companies/401/deliveries',
                        headers: {
                            'Accept': 'application/json',
                            'api-key': env.apiKey,
                            'Content-Type': 'application/json'
                        },
                        data: requestApiEnviame
                    }
                    let envio = await axios(options)
                    console.log(envio.data)
                    // let result = await pool.query('INSERT INTO envios SET ?', { first_name, last_name, job_title, age, email });
                    resolve(envio);
                } catch (error) {
                    console.log(error)
                    reject(error);
                }
            });
        }
    }
})();
