const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const fs = require('fs');

const maxAge = 24 * 60 * 60 * 1000; //24 hours


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: hash,
            isAdmin: req.body.isAdmin
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
                        { userId: user._id, 
                            isAdmin: user.isAdmin
                         },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    )
                    res.cookie("jwt", createdToken, { httpOnly: true, maxAge});
                    res.status(200).json({
                        userPseudo: user.pseudo,
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

exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(404).json({ error }));
}

exports.modifyUserProfile = (req, res, next) => {
    const userObject = req.file ? {
        ...req.body.user,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete userObject._id;
    User.findOne({_id: req.params.id})
    .then((user) => {
        const uid= JSON.stringify(user._id); 
        const authId = JSON.stringify(req.auth.userId)
        if (uid === authId) {
            if(req.file) {
                //delete previous image if a file(img) was added
                const filename = user.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                User.updateOne({ _id: req.params.id}, { ...userObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Utilisateur modifié!'}))
                .catch(error => res.status(401).json({ error }));
                });
            } else {
                User.updateOne({ _id: req.params.id}, { ...userObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Utilisateur modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        } else {
            res.status(403).json({ message : 'Unauthorized request'});
        }
    })
    .catch((error) => {
        res.status(400).json({ error });
    });
}