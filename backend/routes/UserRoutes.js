import express from 'express';

const Router = express.Router();

import { newUser, authenticate, confirmAccount, forgotPassword, forgotPasswordConfirm, newPassword} from '../controllers/UserController.js';

Router.post('/', newUser);

Router.post('/login', authenticate);

Router.get('/confirm/:token', confirmAccount);

Router.post('/forgotpassword', forgotPassword);

Router.route('/forgotpassword/:token')
    .get(forgotPasswordConfirm)
    .post(newPassword);

export default Router;