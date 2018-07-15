var mongoose=require('../mongoose');
var schemaCategory=new mongoose.Schema({
		name:{
		type:String,
		required:true,
		unique:true
	}
	})
var Category=mongoose.model("Category",schemaCategory);
module.exports=Category;