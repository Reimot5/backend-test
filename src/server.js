require("dotenv").config();
const { env } = require('./config')
const app = require('express')()

const { json, urlencoded } = require('body-parser');
const PORT = env.port
const compression = require('compression');
const server = require("http").Server(app)
const cors = require('cors')
const helmet = require('helmet');

const { startDB } = require("./db/mysqlclient");

const routeCrud = require('./routes/routerCrud.js');

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

//ROUTER
app.use(`/crud`, routeCrud);

app.get(`/`, async (req, res) => {
	res.send("hola");
});

server.listen(PORT, async () => {
	//Cargo datos fakes si no existen
	await startDB()
	console.log(`Server running on http://${env.host}:${PORT}/`)
});
