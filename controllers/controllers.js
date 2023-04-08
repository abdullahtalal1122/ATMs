
function staffController (req, res , next){

    res.render('staffPanel');
    next();
}

function adminController (req, res , next){

    res.render('adminPanel');
    next();

}

function homeController (req, res , next){

    res.render('home');
    next();
}

function loginController (req, res , next){

    res.render('login');
    next();
}
function registerController (req, res , next){

    res.render('register');
    next();
}

function mainmenuController(req, res , next){

    res.render('menu');
    next();
}

function updateController(req, res , next){

    res.render('update');
    next();
}
function searchController(req, res , next){

    res.render('search' , { userInfo: {} });
    next();
}
function deleteController(req, res , next){

    res.render('delete');
    next();
}

exports.deleteController = deleteController;
exports.staffController = staffController;
exports.adminController = adminController;
exports.mainmenuController = mainmenuController;
exports.registerController = registerController;
exports.loginController = loginController;
exports.homeController = homeController;
exports.updateController = updateController;
exports.searchController = searchController;
