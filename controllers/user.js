const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const maxAge = 3 * 24 * 60 * 60 * 1000;

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash
        });
        user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Identifiants incorrects' });
            } else {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Identifiants incorrects' });
                    } else {
                    const createdToken = jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                    res.cookie("jwt", createdToken, { httpOnly: true, maxAge});
                    res.status(200).json({
                        usePseudo: req.body.pseudo,
                        userId: user._id,
                        token: createdToken
                    });
                    }
                })
        
                .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.logout = (req, res) => {
    res.cookie('jwt', {maxAge: 1});
   // res.clearCookie("jwt");
    res.status(200).json("OUT");
}