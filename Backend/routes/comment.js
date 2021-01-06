const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentsCtrl");

router.get("/",             commentCtrl .findAllComments);

router.get("/:Messageid",   commentCtrl .findOneComment);

router.post("/",            commentCtrl .createComment);

router.delete("/",          commentCtrl .deleteComment);

module.exports = router;