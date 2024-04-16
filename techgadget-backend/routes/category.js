const express = require("express");

const categoryController = require("../controllers/categoryController");

const router = express.Router();

router.get("/categories", categoryController.getCategories);
router.post("/post-category", categoryController.postCategory);

module.exports = router;
