//en espejo con .env para poder cargar las variables de entorno
module.exports.env = {
	enviroment: process.env.NODE_ENV,
	name: process.env.SERVER_NAME,
	port: process.env.PORT,
	host: process.env.HOST,
	targetUrl: process.env.TARGET_URL,
	dbUser: process.env.DB_USER,
	dbPass: process.env.DB_PASS,
	dbServer: process.env.DB_SERVER,
	dbDatabase: process.env.DB_DATABASE
};
