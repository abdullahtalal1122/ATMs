const mongoose = require('mongoose');

function checkAdminOrStaff(req, res, next) {
  if (req.isAuthenticated() && (req.user.isadmin || req.user.isstaff)) {
    return next();
  } else {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
}

function checkAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.isadmin) {
    return next();
  } else {
    return res.status(403).json({ error: 'Unauthorized access' });
  }
}
const passport = require('passport');

const loginUser = (req, res, User) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });
  req.login(user, (err) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/mainmenu");
    });
  });
}
const registerUser = (req, res, User) => {
  let isAdmin = false;
  let isStaff = false;

  // Check the selected role and update the boolean values accordingly
  if (req.body.role === 'admin') {
    isAdmin = true;
  } else if (req.body.role === 'staff') {
    isStaff = true;
  }

  // Create a new user document and set the boolean values for isadmin and isstaff
  const newUser = new User({
    username: req.body.username,
    name: req.body.name,
    cnic: req.body.cnic,
    gender: req.body.gender,
    balance: req.body.balance,
    isadmin: isAdmin,
    isstaff: isStaff
  });

  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/mainmenu");
    });
  });
}

const deleteUser  = (req,res,next) => {


  const username = req.body.username;
  deleteuser(username,  next)
    .then(message => {
      console.log(message);
      res.redirect("/");
    })
    .catch(err => {
      console.log(err);
      res.redirect("/");
    });
  }
  const deleteuser = (username, User) => {
    return new Promise((resolve, reject) => {
      User.findOne({ username: username })
        .then(user => {
          if (!user) {
            reject(new Error('User not found'));
          } else 
           {
              User.deleteOne({ _id: user._id })
                  .then(() => {
                    resolve('User deleted successfully');
                  })
                  .catch(err => {
                    reject(err);
                  });
              }
            
          
        })
        .catch(err => {
          reject(err);
        });
    });
  };
  const updateUser = (req, res, User) => {
    const email = req.body.email;
    const password = req.body.password;
  
    const newValues = {};
    if (req.body.name) newValues.name = req.body.name;
    if (req.body.cnic) newValues.cnic = req.body.cnic;
    if (req.body.gender) newValues.gender = req.body.gender;
    if (req.body.balance) newValues.balance = req.body.balance;
    if (req.body.role) {
      switch (req.body.role) {
        case 'admin':
          newValues.isadmin = true;
          newValues.isstaff = true;
          break;
        case 'staff':
          newValues.isadmin = false;
          newValues.isstaff = true;
          break;
        default:
          newValues.isadmin = false;
          newValues.isstaff = false;
          break;
      }
    }
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          throw new Error('User not found');
        } else {
          user.authenticate(password, (err, authenticated) => {
            if (err) {
              throw err;
            } else if (!authenticated) {
              throw new Error('Invalid password');
            } else {
              Object.assign(user, newValues);
              return user.save();
            }
          });
        }
      })
      .then(() => {
        res.redirect('/mainmenu');
      })
      .catch(err => {
        console.log(err);
        res.redirect('/');
      });
  };


  
  const searchUser = (req, res, User) => {
    const username = req.body.username;
    
    User.findOne({ username: username })
      .then(user => {
        const userInfo = {
          username: undefined,
          name: undefined,
          cnic: undefined,
          gender: undefined,
          balance: undefined,
          isadmin: undefined,
          isstaff: undefined
        };
  
        if (!user) {
          res.render("search", { message: "User not found", userInfo: userInfo });
        } else {
          userInfo.username = user.username;
          userInfo.name = user.name;
          userInfo.cnic = user.cnic;
          userInfo.gender = user.gender;
          userInfo.balance = user.balance;
          userInfo.isadmin = user.isadmin;
          userInfo.isstaff = user.isstaff;
          res.render("search", { userInfo: userInfo });
        }
      })
      .catch(error => {
        console.log(error);
        res.render("searchUser", { message: "Error occurred while searching for user", userInfo: userInfo });
      });
  };
  
  const displayAllUsers = (req, res, User) => {
    User.find()
      .then(users => {
        res.render("searchAll", { users: users });
      })
      .catch(error => {
        console.log(error);
        res.render("searchAll", { message: "Error occurred while retrieving users" });
      });
  };
  
  
  
  



exports.loginUser = loginUser;
exports.registerUser = registerUser ;
exports.checkAdmin = checkAdmin;
exports.checkAdminOrStaff = checkAdminOrStaff;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.searchUser = searchUser;
exports.displayAllUsers = displayAllUsers;