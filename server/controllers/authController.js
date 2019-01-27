var User = require(`../models/User`)
var jwt = require(`jsonwebtoken`)

module.exports = {
    google: function (req, res) {
        const CLIENT_ID = '192890494616-3t2kin5tuctdutff20800259unqk6tcv.apps.googleusercontent.com'
        const { OAuth2Client } = require('google-auth-library');
        const client = new OAuth2Client(CLIENT_ID);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];

            User.findOne({ email: payload.email })
                .then((result) => {
                    if (result) {
                        jwt.sign({
                            id: result._id,
                            email: payload.email,
                            name: payload.name
                        }, process.env.JWT_SECRET, function (err, encoded) {
                            if (err) {
                                res.status(500).json({ msg: `jwt malformed` })
                            } else {
                                res.status(201).json({
                                    id: result._id,
                                    token: encoded,
                                    name: payload.name,
                                    email: payload.email
                                })
                            }
                        })
                    } else {
                        User.create({
                            email: payload.email
                        }).then((result) => {
                            jwt.sign({
                                id: result._id,
                                email: payload.email,
                                name: payload.name
                            }, process.env.JWT_SECRET, function (err, encoded) {
                                if (err) {
                                    res.status(500).json({ msg: `jwt malformed` })
                                } else {
                                    res.status(201).json({
                                        id: result._id,
                                        token: encoded,
                                        name: payload.name,
                                        email: payload.email
                                    })
                                }
                            })
                        }).catch((err) => {
                            res.status(500).msg({ msg: `internal server error`, err: err })
                        });
                    }
                }).catch((err) => {
                    res.status(500).msg({ msg: `internal server error`, err: err })
                });

        }
        verify().catch(console.error);
    }
};
