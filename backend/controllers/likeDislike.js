// importation du model de la base de donnée MongoDB
const Sauces = require("../models/Sauces");

module.exports = {
    likeDislike: (req, res) => {
        const id = req.params.id;
        if (req.body.like === 1) {
            Sauces.updateOne(
                { _id: req.params.id },
                {
                    $inc: { likes: req.body.like++ },
                    $push: { usersLiked: req.body.userId }
                })

                .then(() => res.status(200).json({ message: '+1 like !' }))
                .catch(error => res.status(400).json({ error }))

        } else if (req.body.like === -1) {
            Sauces.updateOne(
                { _id: req.params.id },
                {
                    $inc: { dislikes: (req.body.like++) * -1 },
                    $push: { usersDisliked: req.body.userId }
                })

                .then(() => res.status(200).json({ message: '+1 dislike !' }))
                .catch(error => res.status(400).json({ error }))

        } else {
            Sauces.findOne({ _id: req.params.id })
                .then(sauce => {
                    if (sauce.usersLiked.includes(req.body.userId)) {
                        Sauces.updateOne({ _id: req.params.id },
                            {
                                $pull: { usersLiked: req.body.userId },
                                $inc: { likes: -1 }
                            })

                            .then(() => res.status(200).json({ message: 'like -1 !' }))
                            .catch(error => res.status(400).json({ error }))

                    } else if (sauce.usersDisliked.includes(req.body.userId)) {
                        Sauces.updateOne({ _id: req.params.id },
                            {
                                $pull: { usersDisliked: req.body.userId },
                                $inc: { dislikes: -1 }
                            })
                            .then(() => res.status(200).json({ message: 'Dislike -1 !' }))
                            .catch(error => res.status(400).json({ error }))
                    }
                })
                .catch(error => res.status(400).json({ error }))
        }
    }
}





