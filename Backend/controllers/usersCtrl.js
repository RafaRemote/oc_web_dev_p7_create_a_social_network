const db = require("../models")
const User      = db.users
const Message   = db.messages
const Comment   = db.comments
const { Op } = require("sequelize");

// Routes CRUD : Create, Read, Update, Delete.

// READ

exports.findOneUser = (req, res, next) => {
    const userData = {}
    User.findOne({ where: { id: req.params.id }})
    .then(user => {
        userData.id             = user.id
        userData.userName       = user.userName
        userData.email          = user.email
        userData.createdAt      = user.createdAt
        userData.isAdmin        = user.isAdmin
    })
    .then(() => {
        Message.count({ where: { userId: req.params.id }})
        .then(total => { 
            userData.totalMessages = total
        })
    })  
    .then(() => {
        Comment.count({ where: { userId: req.params.id }})
        .then( total => { 
            userData.totalComments = total
            res.status(200).json(userData)
        })
    })
    .catch(error => res.status(404).json({ error }))
}

exports.findAllUsers = (req, res, next) => {
    User.findAll({
        where: {id: { [Op.gt]: 0 }} 
    })    
    .then( (found) => {
        res.status(200).json({ found }) 
    })
    .catch((error) => { 
        res.status(400).json({ error }) 
    })
}

// params uid & isAdmin

exports.deleteOneUser = (req, res, next) => {
    console.log(" USER DELETION PROCESS ")
    console.log(" user Id is: " + req.query.uid)
    console.log(" User Id who ask the deletion is sAdmin : " + req.query.isAdmin)

    console.log(" if isAdmin True => delete the user ")
    console.log(" if False => unauthorized ")
    
    console.log(req.query.isAdmin)
    if(req.query.isAdmin) {
        User.destroy({ where: { id: req.query.uid}})
        Message.destroy({ where: { UserId: req.query.uid }})
        Comment.destroy({ where: { UserId: req.query.uid }})
        .then((res) => {
            res.status(200).json({ message: "User, its Messages and its comments have been destroyed" })
        })
        .catch(error => res.status(400).json({ error }))
    } else {
        res.status(401).json({message : " unauthorized "})
    }
}

exports.deleteMyAccount = (req, res, next) => {
    console.log(" USER ACCOUNT DELETION PROCESS ")
    console.log(" user Id is: " + req.params.id)

    Comment.destroy({ where: { UserId: req.params.id }})
    Message.destroy({ where: { UserId: req.params.id }})
    User.destroy({ where: { id: req.params.id }}) 
    .then( () => res.status(200).json({message: "ok"}))
    .catch(error => console.log(error))
}
