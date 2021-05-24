//en espejo con .env para poder cargar las variables de entorno
module.exports.env = {
	enviroment: process.env.NODE_ENV,
	server_name: process.env.SERVER_NAME,
	port: process.env.PORT,
	host: process.env.HOST,
	apiKey: process.env.API_KEY,
    dbHost: process.env.DB_HOST,
	dbUser: process.env.DB_USER,
	dbPassword: process.env.DB_PASSWORD,
};
