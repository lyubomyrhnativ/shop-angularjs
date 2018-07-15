var mongoose=require('mongoose');
//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://lyubomyr:lyubomyr123@ds257590.mlab.com:57590/shop-angularjs');
console.log("mongodb connect...")
module.exports=mongoose;