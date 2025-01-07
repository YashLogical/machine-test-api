// import dependancies in the  router files  
const express = require('express');        
const router = express();  
const testControllers = require('../controllers/test_controllers');

//api get
router.get('/test', testControllers.test);

//api post   
router.post('/signup',testControllers.User_SignUp); 
router.post('/login',testControllers.User_Login);  

module.exports = router;