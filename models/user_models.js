// creat user model schema
const mongoose=require('mongoose');
const userSchema = new mongoose.Schema({
	
mobile_no:{ 
	type:String,
	required:false, 
},
otp:{
	type:String, 
	required:false,
},
user_image: {
       type: String,
},
name:{
	type:String,
	required:false,
},
email:{
	type:String,
	required:false,
},
password:{
	type:String,
	required:false,
},
gender:{
	type:String,
	required:false,
},
date_of_birth:{
	type:String,
	required:false,
},
anniversary_date:{
	type:String,
	required:false,
},
role_type:{
	type:String,
	required:false,
},
fcm_id:{
	type:String,
	required:false,
},
token:{  
	type: String,
	required:false, 
},
user_status:{
	type:String,
	required:false,
	default:0 
},
user_active_status:{
    type:String,
    required:true,
    default:0
},
user_referral_code:{
	type:String,
	required:false,
},
apply_referral_code:{
	type:String,
	required:false,
},
referral_code_status:{
	type:String,
	required:false,
	default:0
},
wallet_ammount:{
	type:Number,
	required:false,
	default:0
},


},{timestamps:true});
module.exports = UserModel= mongoose.model("user",userSchema);