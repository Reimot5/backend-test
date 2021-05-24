require("dotenv").config();
const { env } = require('./config')
const app = require('express')()
const { json, urlencoded } = require('body-parser');
const PORT = env.port
const compression = require('compression');
const server = require("http").Server(app)
const cors = require('cors')
const helmet = require('helmet');
const SERVER_NAME = env.server_name
const { startDB } = require("./db/mysqlclient");

//ROUTERS
const routerCrud = require('./routes/routerCrud.js');
const routerPalindromo = require('./routes/routerPalindromo.js')
const routerCrearEnvio = require('./routes/routerCrearEnvio.js')
const routerFibonacci = require('./routes/routerFibonacci.js')

let corsOptions = {
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
	credentials: true,
	optionsSuccessStatus: 200,
};

//MIDDLEWARES
app.use(compression());
app.use(helmet())
app.use(cors(corsOptions))
app.use(urlencoded({ extended: true }));
app.use(json());

//ROUTES
app.use(`/crud`, routerCrud);
app.use(`/palindromo`, routerPalindromo);
app.use(`/crear-envio`, routerCrearEnvio);
app.use(`/fibonacci`, routerFibonacci);

app.get(`/`, async (req, res) => {
	res.send(`Servidor ${SERVER_NAME} corriendo correctamente`);
});

server.listen(PORT, async () => {
	//Cargo datos fakes si no existen
	await startDB()
	console.log(`Server running on http://${env.host}:${PORT}/`)
});
