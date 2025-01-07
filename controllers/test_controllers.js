const jwt = require("jsonwebtoken");    
const mongoose =require('mongoose');                                                   
const ObjectId = require('mongoose').Types.ObjectId; 
const Test = require('../models/sub_module_models');
const userModel=require('../models/user_models');    


const JWT_SECRET_KEY = 'gfg_jwt_secret_key';    
const TOKEN_KEY = 'gfg_token_header_key';     

const test = async(req, res) => {
    try {
    	const data = await Test.find({})
    	console.log(data)
        res.render('test.ejs',{data:data})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ result: "false", msg: "Internel Server Error" })
    }
}

//create user login api  
const User_SignUp =async(req,res)=>{
    const {mobile_no,email,password } =req.body; 
    try{ 
        if(mobile_no && email && password){ 
            
            const user = await userModel.findOne({mobile_no:mobile_no});

            if(user){
                res.status(400).json({
                    result:'false',
                    msg:'mobile_no already exist..'
                }); 
            }else{
               
                const otp = Math.floor(1000 + Math.random() * 9000);
                const user_register = new userModel({mobile_no,email,password,role_type:'user'});
                const token = jwt.sign({ _id: user_register._id,mobile_no },TOKEN_KEY, {expiresIn: "1h",});
                user_register.token = token; 
                const user_data = await user_register.save();
               
                res.status(200).json({
                    result:'true',
                    msg:'user register successfully..',
                    data:{
                        userId:user_data._id,
                        mobile_no:user_data.mobile_no,
                        otp:user_data.otp,
                        role_type:user_data.role_type,
                        token:user_data.token,
                    }
                });
            }
        }else{
            res.status(400).json({
                result:'false',
                msg:'parameter required mobile_no,email & password..'
            });  
        }        
    }catch(error){
        console.log(error.message)
    }
};

//create user login api 
const User_Login = async (req, res) => {
    const { email,password } = req.body;

    try {
        // Check if country_code and mobile_no are provided
        if ( !email && !password) {
            return res.status(400).json({
                result: 'false',
                msg: 'Parameter required: email & password.'
            });
        }

        // Find user by email and password
        const user = await userModel.findOne({ email: email, password:password });

        if (!user) {
            return res.status(400).json({
                result: 'false',
                msg: 'mobile no does not exist..'
            });
        }else{
            // Generate OTP and token
            const otp = Math.floor(1000 + Math.random() * 9000);
            const token = jwt.sign({ _id: user._id }, TOKEN_KEY, { expiresIn: "1h" });

            // Update the user with OTP and token
            const user_data = await userModel.findOneAndUpdate(
                { _id: user._id },
                { $set: { otp, token } },
                { new: true }
            );

            return res.status(200).json({
                result: 'true',
                msg: 'User login successfully..',
                data: {
                    userId: user_data._id,
                    mobile_no: user_data.mobile_no,
                    email: user_data.email,
                    password: user_data.password,
                    otp: user_data.otp,
                    role_type: user_data.role_type,
                    token: user_data.token
                }
            });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            result: 'false',
            msg: 'Server error: ' + error.message
        });
    }
};


module.exports = {
    test,
    User_SignUp,
    User_Login
}    