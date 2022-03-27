var express = require("express");
var router = express.Router();

var Product = require('../models/Product');

const multer  = require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, path.join(__dirname,'../','public/uploads'));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage })

router.get( '/index', async ( req, res, next ) => {
    console.log( req.method, req.url )
    try {
        var product = await Product.find( {  } );
        console.log(product);
        res.render( 'product/index', { product } );
    } catch ( err ) {
        return next( err );
    } 
} );

router.get( '/new', ( req, res, next ) => {
    res.render( 'product/new' );
} );

router.post( '/new', upload.single('cover_image'), async ( req, res, next ) => {
    req.body['cover-image'] = req.file.filename;
    try {
        const product = await Product.create( req.body );
        res.redirect( '/products/index');
    } catch ( err ) {
        return next( err );
    }
} );

router.get( '/:slug/show', async ( req, res, next ) => {
    var slug = req.params.slug;
    try{
        const product = await Product.findOne({slug:slug});
        res.render( 'product/show', { product } );
    } catch ( err ) {
        return next( err );
    }
} )


// router.get( '/show', ( req, res, next ) => {
//     var name = "ipod 3-gen";
//     Product.findOne( {name : name}, ( product, err ) => {
//         if ( err ) return next( err );
//         res.render( 'product/show', { product } );
//     } )
// } );

router.get( '/:slug/edit', ( req, res, next ) => {
    var slug = req.params.slug;
    if ( req.session.userId ){
    try {
        const product = Product.findOne( { slug: slug } );
        res.render( '/product/edit', { product: product } );
    } catch ( err ) {
        return next( err );
    }
    } else {
        res.render('/dashboard');
    }
} )

router.post( '/:slug/edit', ( req, res, next ) => {
    var slug = req.params.slug;
    try {
        const product = Product.findOneAndUpdate( { slug: slug }, req.body );
        res.redirect( '/product/index' );
    } catch ( err ) {
        return next( err );
    }
} )




module.exports = router;