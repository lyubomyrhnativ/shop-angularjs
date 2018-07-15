
var mongoose=require('../mongoose');
var schemaProduct=new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	model:{
		type:String,
		unique:true,
		required:true
	},
	category:{
		type:String,
		required:true
	},
	count:{
		type:Number,
		required:true
	},
	price:{
		type:Number,
		required:true
	},
	path:{
		type:String,
		required:true
	}
	})
var Product=mongoose.model("Product",schemaProduct);
module.exports=Product;