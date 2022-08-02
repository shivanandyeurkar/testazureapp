const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();
const { appConstants } = require('../data/constants.js');

const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

const checkAuthenticated = (req, res, next) => {
  try {
    const token = req.header("authorization");
    if (!token) {
      res.status(401).send({ message: appConstants.ERROR_NO_TOKEN });
    } else {
    let user = {};
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      user.name = payload.name;
      user.email = payload.email;
      user.id = payload.sub;
    }
    verify()
      .then(() => {
        req.user = user;
        next();
      })
      .catch((err) => {
        res.status(403).send({ message: appConstants.ERROR_UNAUTHORIZED });
      })
    }
  } catch (err) {
    res.status(500).send({ message: appConstants.SOMETHING_WRONG });
  }
}

module.exports = checkAuthenticated
