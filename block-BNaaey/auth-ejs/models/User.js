var mongoose = require('mongoose');
var Schema = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new Schema({
    name: { type:String, require:true },
    email:{ type:String, unique:true, require:true },
    password:{ type:String, require:true }
})

userSchema.pre('save', function( next ){
    console.log(this,"inside pre-hook");
    if ( this.password && this.isModified('password') ){
        bcrypt.hash( this.password, 10, ( err, hashed )=>{
            if ( err ) return next( err );
            this.password = hashed;
            return next();
        } );
    } else {
        next();
    }
});

userSchema.methods.verifyPassword = function(password,cb){
    bcrypt.compare( password, this.password, ( err,result )=>{
        return (err, result);
    } )
}

module.exports = mongoose.model("User",userSchema);