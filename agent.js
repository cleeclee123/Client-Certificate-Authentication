const fileSystem = require("fs");
const https = require("https");
const path = require("path");

module.exports = function (client) {
    const keyFile = path.resolve(__dirname, `certs/${client}_key.pem`);
	const certFile = path.resolve(__dirname, `certs/${client}_cert.pem`);

	return new https.Agent({
        key: fileSystem.readFileSync(keyFile),
		cert: fileSystem.readFileSync(certFile),
		rejectUnauthorized: false
	});
};