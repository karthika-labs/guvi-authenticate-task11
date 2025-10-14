const routes=require('express').Router();
const authControllers=require('../controllers/authControllers')

const authMiddleware=require('../middleware/authMiddleware')




routes.post('/register',authControllers.registerUser)
routes.post('/login',authControllers.login)
routes.get('/user',authMiddleware,authControllers.getData)

module.exports=routes