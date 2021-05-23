require("dotenv").config();
const { env } = require('./config')
const app = require('express')()

const { json, urlencoded } = require('body-parser');
const PORT = env.port
const compression = require('compression');
// const app = express()
const server = require("http").Server(app)
const cors = require('cors')
const helmet = require('helmet');

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
app.use(helmet()) //seguridad, no quitar!!!
app.use(cors(corsOptions)) //seguridad, no quitar!!!
app.use(urlencoded({ extended: true }));
app.use(json());

//ROUTER
app.use(`/turnos`, turnos);

app.get(`/`, (req, res) => {
    res.send("Servidor corriendo correctamente");
});

if (env.enviroment === 'production') {
	server.listen(PORT, () => {
		console.log(`Server running on https://${env.host}/`)
	});
} else {
	server.listen(PORT, () => {
		console.log(`Server running on http://${env.host}:${PORT}/`)
	});
}

app.use(({ status = 500, message = "", error = "" }, req, res, next) => {
    console.error(`${status}: ${message || error}`);
    res.status(status).send(message || error);
});
