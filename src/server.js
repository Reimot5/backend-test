require("dotenv").config();
const { env } = require('./config')
const app = require('express')()

const { json, urlencoded } = require('body-parser');
const PORT = env.port
const compression = require('compression');
const server = require("http").Server(app)
const cors = require('cors')
const helmet = require('helmet');

const startDB = require("./db/mysqlclient").startDB;

require("./services/srvcTurnos")

const turnos = require('./routes/turnos.js');

let corsOptions = {
	// origin: `${env.targetUrl}`,
	origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	preflightContinue: false,
	credentials: true,
	optionsSuccessStatus: 200,
};

app.use(compression());
app.use(helmet())
app.use(cors(corsOptions))
app.use(urlencoded({ extended: true }));
app.use(json());

//ROUTER
app.use(`/turnos`, turnos);

app.get(`/`, async (req, res) => {
	res.send("hola");
});

server.listen(PORT, async () => {
	//Cargo datos fakes si no existen
	await startDB()
	console.log(`Server running on http://${env.host}:${PORT}/`)
});

app.use(({ status = 500, message = "", error = "" }, req, res, next) => {
	console.error(`${status}: ${message || error}`);
	res.status(status).send(message || error);
});
