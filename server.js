const { response } = require("express");
const express = require("express");
const fileSystem = require("fs");
const https = require("https");
const path = require("path");

console.log("Node Server Running");

const options = {
  key: fileSystem.readFileSync("server_key.pem"),
  cert: fileSystem.readFileSync("server_cert.pem"),
  requestCert: true,
  rejectUnauthorized: false,
  ca: [fileSystem.readFileSync("server_cert.pem")],
};

const app = express();

// landing page (unauthenticated)
app.get(~"/", (request, response) => {
  response.send('<a href = "authenticate> Log in with Client Certificate </a>');
});

// Client page - protected endpoint (authenticate)
app.get("/authenticate", (request, reponse) => {
  const certificate = request.connection.getPeerCertificate(true);

  // valid client certificate
  if (request.client.authorized) {
    reponse.send(
      `Hello ${certificate.subject.CN}, <br> Your certificate was issued by ${certificate.issuer.CN}`
    );
    // invalid client certificate
  } else if (certificate.subject) {
    // 403 -> forbidden
    response
      .status(403)
      .send(
        `Unauthorized Clinet Certificate <br> Your certificate was issued by ${certificate.issuer.CN} is invalid`
      );
  } else {
    // 401 -> unauthorized
    response.sendStatus(401);
  }
});

// create https server
https.createServer(options, app).listen(9999);
