var express = require('express');
var router = express.Router();
let Comment = require('../models/comment');
let Article = require('../models/articles');

// add comment
router.post('/:id/comments', (req, res, next) => {
    var id = req.params.id;
    req.body.bookId = id;
    console.log(req.body)
    Comment.create(req.body, (err, comment) => {
        if (err) return next(err);
        Article.findByIdAndUpdate(id, { $push: { comments: comment._id } }, (err, update) => {
            res.redirect('/articles/' + id)
        })
    })
})