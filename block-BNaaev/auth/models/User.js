var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            minlenght: 5,
            required: true
        }
    }, { 
        timestamps: true 
    }
);

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
} );

module.exports = mongoose.model( "User", userSchema );