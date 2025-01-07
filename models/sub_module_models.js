// creat vender model schema
const mongoose=require('mongoose');
const SubModuleSchema = new mongoose.Schema({
sub_module_name:{
	type:String,
	required:true,
},
add_status:{
	type:String,
	required:true,
},
update_status:{
	type:String,
	required:true,
},

delete_status:{
	type:String,
	required:true,
},

active_status:{
	type:String,
	required:true,
},

createdBy:{
	type:String,
	required:false,
},
updatedBy:{
	type:String,
	required:false,
},

},{timestamps:true});
module.exports = SubModuleModel= mongoose.model("sub_module",SubModuleSchema);