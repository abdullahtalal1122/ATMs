const express = require('express');
const routes = express.Router();
const User = require('../models/Usermodel');


// Require middleware functions
const middleware = require("../middleware/middleware");
const controllers = require("../controllers/controllers");


routes.get('/', controllers.homeController);
routes.get('/staff', middleware.checkAdminOrStaff , controllers.staffController);
routes.get("/searchAll",middleware.checkAdmin , (req, res) => middleware.displayAllUsers(req, res, User));
routes.get('/mainmenu' ,controllers.mainmenuController);
routes.get('/admin', middleware.checkAdmin, controllers.adminController);

routes
.get('/login',controllers.loginController)
.post("/login", (req, res) => middleware.loginUser(req, res, User));

routes
.get('/delete', middleware.checkAdmin, controllers.deleteController)
.post("/delete" , (req,res) => middleware.deleteUser(req,res,User));

routes
.get('/search', middleware.checkAdminOrStaff, controllers.searchController)
.post("/search" , (req,res) => middleware.searchUser(req,res,User));

routes
.get('/update', middleware.checkAdmin, controllers.updateController)
.post("/update" ,(req,res) => middleware.updateUser(req,res,User));

routes
.get('/register', middleware.checkAdmin ,controllers.registerController)
.post("/register", (req, res) => middleware.registerUser(req, res, User));




module.exports = routes;
