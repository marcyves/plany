module.exports.checkSignIn = function (req, res, next){
    if(req.session.token){
       next();     //If session exists, proceed to page
    } else {
      // Trying to access unauthorized page, redirect to login
      res.redirect('/user/login');
    }
 }

 module.exports.debug = function (level, msg){
   console.log(`=== ${msg}`);
 }