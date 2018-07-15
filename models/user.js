var mongoose=require('../mongoose');
var schemaUser=new mongoose.Schema({
		id:{
		type:Number,
		unique:true
	},
		email:{
		type:String,
		required:true,
		unique:true
	},
		name:{
		type:String,
		required:true,
		unique:true
	},
		password:{
		type:String,
		required:true,
		unique:true
	},
		photos:{
		type:String,
		unique:true
	}
	})
var User=mongoose.model("User",schemaUser);
module.exports=User;