const { actualizarSueldosEmpleados } = require('../services/srvcActualizarSueldos')

module.exports = (() => {
    return {
        actualizarSueldos() {
            return new Promise(async (resolve, reject) => {
				try {
                    let result = await actualizarSueldosEmpleados()
                    //crear tabla con result
                    resolve(result)
				} catch (error) {
					console.log(error)
					reject(error)
				}
			})
        },
    }
})();

function createTable() {
    let head = `<html>
        <head>
            <style>
                table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                }

                th, td {
                    padding: 15px;
                }

                .center {
                    text-align: center;
                }
            </style>
        </head>`
        let body = `
        <body>
            <h2>Basic HTML Table</h2>
            <table style="width:100%">
                <tr>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Age</th>
                </tr>
                <tr class="center">
                    <td>Jill</td>
                    <td>Smith</td>
                    <td>50</td>
                </tr>
                <tr class="center">
                    <td>Eve</td>
                    <td>Jackson</td>
                    <td>94</td>
                </tr>
                <tr class="center">
                    <td>John</td>
                    <td>Doe</td>
                    <td>80</td>
                </tr>
            </table>
        </body>
        </html>`
        let html = `${head}${body}`
}
