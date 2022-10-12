const Post = require('../models/post');
//for delete function, to remove the image:
const fs = require('fs');

exports.createPost = (req, res, next) => {
    //delete id given by front end and given by user
    delete req.body._id;
    delete req.body._userId;
    if (req.file) {
       imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } else {
        imageUrl=""
    }
    const post = new Post({
        ...req.body,
        //userId extracted from token by auth middleware
        userId: req.auth.userId,
        imageUrl: imageUrl
    });
    post.save()
    .then(() => res.status(201).json({ message: 'Post enregistré !' }))
    .catch(error => res.status(400).json({ message: 'Le post n\'a pas pu être créé' + error }));
};

// exports.getOnePost = (req, res, next) => {
//     Post.findOne({ _id: req.params.id })
//         .then(post => res.status(200).json(post))
//         .catch(error => res.status(404).json({ error }));
// };

exports.getAllPosts = (req, res, next) => {
    Post.find()
      .then(posts => res.status(200).json(posts))
      .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {
    //si req.file existe, on traite la nouvelle image, sinon on traite simplement l'objet entrant
    const postObject = req.file ? {
        ...req.body.post,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete postObject._userId;
    Post.findOne({_id: req.params.id})
        .then((post) => {
            if (req.auth.isAdmin || post.userId === req.auth.userId) {
                if(req.file) {
                    //delete previous image if a file(img) was added
                    const filename = post.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                    Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
                    .then(() => res.status(200).json({message : 'Post modifié!'}))
                    .catch(error => res.status(401).json({ error }));
                    });
                } else {
                    Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
                    .then(() => res.status(200).json({message : 'Post modifié!'}))
                    .catch(error => res.status(401).json({ error }));
                }
            } else {
                res.status(403).json({ message : 'Unauthorized request'});
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };


exports.deletePost = (req, res, next) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            if (req.auth.isAdmin || post.userId === req.auth.userId) {
                if(!post.imageUrl) {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Post supprimé !'}))
                        .catch(error => res.status(400).json({ error }));
                } else {
                const filename = post.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Post supprimé !'}))
                        .catch(error => res.status(400).json({ error }));
                });
                }
            } else {
                res.status(401).json({message: 'Suppression non autorisée !' });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
};

exports.likePost = (req, res, next) => {
        //const liked = 1;
        //const disliked = -1;
        Post.findOne({_id: req.params.id})
            .then(post => {
                if (post.usersLiked.includes(req.body.userId)) {
                    Post.updateOne({ _id: req.params.id }, { $pull: {usersLiked: req.body.userId}, $inc: { likes: -1 } })
                        .then((post) => { res.status(200).json({ message: 'Like supprimé' })})
                        .catch(error => res.status(400).json({ error }));
                } else {
                    Post.updateOne({ _id: req.params.id }, { $inc: { likes: req.body.like++ }, $push: { usersLiked: req.body.userId } })
                    .then((post) => res.status(200).json({ message: 'Like ajouté !' }))
                    .catch(error => res.status(400).json({ error }));
                }
            })
            .catch(error => res.status(400).json({ error }));
}

