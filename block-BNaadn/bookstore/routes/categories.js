var express = require("express");
var router = express.Router();
var Category = require("../models/category");

// read 
router.get("/", (req, res, next) => {
  Category.find({}, (err, categories) => {
    res.render("category", { categories });
  });
});
// add category
router.get("/new", (req, res) => {
  res.render("categoryForm");
});
// create
router.post("/", (req, res, next) => {
  Category.create(req.body, (err, categor) => {
    if (err) return next(err);
    res.redirect("/categories");
  });
});

module.exports = router;
