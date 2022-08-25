var express = require("express");
var router = express.Router();

var Book = require(`../models/book`);
var Author = require(`../models/author`);
var Category = require(`../models/category`);

// list all books
router.get("/", function (req, res, next) {
  Book.find({})
    .populate(`author`)
    .exec((err, books) => {
      if (err) return next(err);
      res.render("books", { books: books });
    });
});


// add new book
router.get(`/new`, (req, res, next) => {
  Author.find({}, (err, authors) => {
    if (err) return next(err);
    Category.find({}, (err, categories) => {
      if (err) return next(err);
      res.render(`bookForm`, { authors: authors, categories: categories });
    });
  });
});
// create book
router.post(`/`, (req, res, next) => {
  Book.create(req.body, (err, book) => {
    if (err) return next(err);
    res.redirect(`/books`);
  });
});
// read specific book
router.get(`/:id`, (req, res, next) => {
  var id = req.params.id;
  Book.findById(id, (err, books) => {
    console.log(books);
    if (err) return next(err);
    res.render(`singleBook`, { books });
  });
});
// Update specific book
router.get(`/:id/edit`, (req, res) => {
  var id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) return next(err);
    res.render(`updateBook`, { book });
  });
});

router.post(`/:id`, (req, res) => {
  var id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, (err, updatedBook) => {
    if (err) return next(err);
    res.redirect(`/books/` + id);
  });
});
// delete specific book
router.get(`/:id/delete`, (req, res) => {
  var id = req.params.id;
  Book.findByIdAndDelete(id, req.body, (err, deletedBook) => {
    if (err) return next(err);
    res.redirect(`/books`);
  });
});

module.exports = router;
