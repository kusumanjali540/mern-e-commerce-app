const express = require("express");

const categoryController = require("../controllers/categoryController");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/categories", categoryController.getCategories);
router.post("/post-category", isAuth, categoryController.postCategory);

module.exports = router;
