const express       = require("express");
const router        = express.Router();
const userCtrl      = require("../controllers/usersCtrl");

router.get("/all/",         userCtrl.findAllUsers)

router.get("/:id",          userCtrl.findOneUser)

router.delete("/",          userCtrl.deleteOneUser)

router.delete("/:id",       userCtrl.deleteMyAccount)

module.exports = router
