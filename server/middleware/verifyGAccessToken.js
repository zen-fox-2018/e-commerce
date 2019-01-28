const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

function verifyGToken (req,res,next) {
  console.log('==========> verifying G token')
  let token = req.body.accessToken ? req.body.accessToken : null;
  // console.log(token)
  async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
        // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    req.accessToken = payload;
    next();
  }
  verify().catch( err=>console.log(err));
}


module.exports = verifyGToken;