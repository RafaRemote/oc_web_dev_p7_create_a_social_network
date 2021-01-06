const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentsCtrl");
const auth = require('../middleware/auth'); 

router.get("/",                commentCtrl .findAllComments);

router.get("/:Messageid",      commentCtrl .findOneComment);

router.post("/",         auth,      commentCtrl .createComment);

router.delete("/",       auth,      commentCtrl .deleteComment);

module.exports = router;