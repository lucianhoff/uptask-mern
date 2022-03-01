import express from 'express';
import checkAuth from "../middleware/checkAuth.js";
const Router = express.Router();

import { newUser, authenticate, confirmAccount, forgotPassword, forgotPasswordConfirm, newPassword, perfil} from '../controllers/UserController.js';

Router.post('/', newUser);

Router.post('/login', authenticate);

Router.get('/confirm/:token', confirmAccount);

Router.post('/forgotpassword', forgotPassword);

Router.route('/forgotpassword/:token')
    .get(forgotPasswordConfirm)
    .post(newPassword);


Router.get('/perfil', checkAuth, perfil)
export default Router;