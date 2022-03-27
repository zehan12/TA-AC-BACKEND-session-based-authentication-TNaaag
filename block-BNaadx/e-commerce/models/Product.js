var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var URLSlug = require("mongoose-slug-generator");

mongoose.plugin(URLSlug);

var productSchema = new Schema( {
    name: { type: String, unique: true, required: true },
    quantity: { type: Number, default: 1 }, 
    price: { type: Number, required: true  },
    "cover_image": String ,
    likes: { type: Number, default: 0 },
    slug: { type: String, slug: this.name, unique: true }
}, { timestamps: true } );

productSchema.pre("save", function(next) {
    this.slug = this.name.split(" ").join("-");
    next();
});

module.exports = mongoose.model( 'Product', productSchema );