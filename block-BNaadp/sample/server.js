var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();

app.use(cookieParser())

app.use( ( req, res, next )=>{
    console.log( req.cookies );
    next();
} )

app.get('/', function (req, res) {

    req.cookies('username','zehan')
    // Cookies that have not been signed
    console.log('Cookies: ', req.cookies)

    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
    res.end("index page");
});

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.get('/test', (req,res)=>{
    req.session.test ?  req.session.test++ : req.session.test=1;
    res.send(req.session.test.toString());
})


app.listen(8080,()=>{
    console.log("server listening on PORT 8080");
});
