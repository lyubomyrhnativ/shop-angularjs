
var mongoose=require('../mongoose');
var schemaOrderProduct=new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	model:{
		type:String,
		required:true
	},
	category:{
		type:String,
		required:true
	},
	newcount:{
		type:Number,
		required:true
	},
	newprice:{
		type:Number,
		required:true
	}
	})
var schemaOrder=new mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	phone:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	cart:[schemaOrderProduct],
	total:{
		type:Number,
		required:true
	},
	check:{
		type:Boolean,
		required:true
	}
	})

var Product=mongoose.model("Order",schemaOrder);
module.exports=Product;