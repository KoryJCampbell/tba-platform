const { send } = require('micro')
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
// Set up Auth0 configuration
const authConfig = {
    domain: "tbaevents.auth0.com",
    clientId: process.env.AUTH0_CLIENT_ID,
    audience: "https://tbaevents.auth0.com/api/v2/"
  };
  
  // Define middleware that validates incoming bearer tokens
  // using JWKS from freshlystreamed.auth0.com
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),

    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ["RS256"]
});

module.exports = async (req, checkJwt, res) => {
    res.status(200).json({
        msg: "Your Access Token was successfully validated!"
    });
}
