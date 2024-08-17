const express = require("express");

const categoryController = require("../controllers/categoryController");
const isAuthAdmin = require("../middleware/is-auth-admin");

const router = express.Router();

router.get("/categories", categoryController.getCategories);
router.post("/post-category", isAuthAdmin, categoryController.postCategory);

module.exports = router;
