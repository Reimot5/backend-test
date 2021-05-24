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

//Inicio base de datos con datos fake
// const { startDB } = require("./db/mysqlclient");

//ROUTERS
const routeCrud = require('./routes/routerCrud.js');

//MIDDLEWARES
let corsOptions = {
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

//ROUTES
app.use(`/crud`, routeCrud);

app.get(`/`, async (req, res) => {
	res.send(`Servidor ${SERVER_NAME} corriendo correctamente`);
});

server.listen(PORT, async () => {
	//Cargo datos fakes si no existen
	await startDB()
	console.log(`Server running on http://${env.host}:${PORT}/`)
});
