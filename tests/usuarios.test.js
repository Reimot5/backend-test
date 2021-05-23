const usuarios = require("../../services/srvcUsuarios");
const { uidRegEx } = require("../regExp");
var sqlClient = null;

beforeAll(() => {
    require("dotenv").config();
    const { env } = require("../config");
    sqlClient = require("../db/mssqlclient")({
        user: env.dbUser,
        password: env.dbPass,
        server: env.dbServer,
        database: env.dbDatabase,
        options: {
            enableArithAbort: true,
            encrypt: false
        }
    });
    usuarios.init({ sqlClient, firebaseAuth });
});

describe("service: usuarios", () => {

    test("get - OK", async () => {
        try {
            let usuario = await usuarios.get("42A86E50E797");
            expect(usuario).not.toBe(null);
        } catch (e) {
            console.error(e);
            expect(e).toMatch('error');
        }
    });

    test("get - FAIL", async () => {
        try {
            let usuario = await usuarios.get("42A86E50E791");
            expect(usuario).toBe(null);
        } catch (e) {
            console.error(e);
            expect(e).toMatch('error');
        }
    });

});

