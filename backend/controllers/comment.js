const Comment = require('../models/comment');
//for delete function, to remove the image:
const fs = require('fs');

exports.createComment = (req, res, next) => {
    // if (!req.body.content) {
    //     res.status(400).send({
    //         message: "Impossible de publier un commentaire vide !"
    //     })
    // }
    delete req.body._id;
    delete req.body._userId;
    const comment = new Comment({
        ...req.body,
        //userId extracted from token by auth middleware
        commenterId: req.auth.userId,
    });
    comment.save()
    .then(() => res.status(201).json({ message: 'Commentaire enregistré !' }))
    .catch(error => res.status(400).json({ message: 'Le commentaire n\'a pas pu être créé' + error }));
    //delete id given by front end and given by user
    // Post.findOne({_id: req.params.id})
    //         .then(post => {
    //             Post.updateOne({ _id: req.params.id }, {$push: {comments: req.body}})
    //             .then(() => res.status(200).json({message : 'Commentaire ajouté!'}))
    //             .catch(error => res.status(400).json({ error }));
    //         })
    //         .catch((error) => {
    //             res.status(400).json({ error });
    //         });
};


exports.getAllComments = (req, res, next) => {
    Comment.findAll()
    .then((comments) => res.status(200).json(comments))
    .catch(error => res.status(400).json({ error }));
    // Post.findOne({_id: req.params.id})
    //   .then(posts => res.status(200).json(posts.comments))
    //   .catch(error => res.status(400).json({ error }));
};

exports.getCommentsForOnePost = (req, res, next) => {
    Comment.find({ postId: req.params.id })
    .then(
        function (comment) { res.status(200).json(comment)})
    .catch(
        function (error) { res.status(400).json({ error })});
    // Post.findOne({_id: req.params.id})
    //   .then(posts => res.status(200).json(posts.comments))
    //   .catch(error => res.status(400).json({ error }));
};

exports.deleteComment = (req, res, next) => {
    Comment.findOne({ _id: req.params.id })
        .then(comment => {
            if (req.auth.isAdmin || comment.commenterId === req.auth.userId) {
                    comment.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Commentaire supprimé !'}))
                        .catch(error => res.status(400).json({ error }));
            } else {
                res.status(401).json({message: 'Suppression non autorisée !' });
            }
        })
        .catch( error => {
            res.status(400).json({message: "Erreur pour trouver le commentaire" + {error} });
        });
};

exports.modifyComment = (req, res, next) => {
    Comment.updateOne({ _id: req.params.id}, { text: req.body.text, _id: req.params.id})
    .then(() => res.status(200).json({message : 'Commentaire modifié!'}))
    .catch(error => res.status(401).json({ error }));
}