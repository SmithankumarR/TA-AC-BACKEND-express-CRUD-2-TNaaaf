var express = require("express");

var router = express.Router();

var Author = require("../models/author");

// authors list
router.get("/", (req, res, next) => {
  Author.find({}, (err, authors) => {
    if (err) return next(err);
    res.render("authorLists", { authors });
  });
});
//  add author
router.get("/new", (req, res) => {
  res.render(`authorForm`);
});
// read
router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Author.findById(id, (err, author) => {
    if (err) return next(err);
    res.render("authorDetails", { author: author });
  });
});
// create
router.post("/", (req, res, next) => {
  Author.create(req.body, (err, Created) => {
    if (err) return next(err);
    res.redirect("/authors");
  });
});

module.exports = router;
