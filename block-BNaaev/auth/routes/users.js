var express = require('express');
var router = express.Router();

var User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//! handel request on get and render registration form
router.get('/register', function(req, res, next) {
  res.render( 'registeration' );
});

//! handel request on post and grab data and create user db
router.post( '/register', ( req, res, next ) => {
  User.create( req.body, ( err, user )=>{
    if ( err ) return next( err );
    console.log("done");
    res.redirect( "/users/index" );
  } );
} );


module.exports = router;
