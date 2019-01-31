const jwt = require('jsonwebtoken');

function verifyJWT (req,res,next) {
  console.log('=====> verifying JWT')
  if(!req.headers.authorization)  {
    res.status(400).json({error: 'you are not authorized to use this endpoint.'})
  } else {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, function (error, decoded)  {
      if(error) {
        next(error);
      } else {
        req.decoded = decoded;
        console.log(req.decoded)
        next()
      };
      return;
    })
  }
}

function checkAdminRole (req,res,next) {
  if(req.decoded.role =='admin') {
    next()
  } else {
    let error= 'current user is not an admin.';
    next(error)
  }
  return;
}

module.exports = {verifyJWT, checkAdminRole};