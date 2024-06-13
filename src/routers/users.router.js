import express from 'express';
import { RequireAccessToken } from '../middlewares/require-access-token.middleware.js';
import { UsersController } from '../controllers/users.controller.js';

const usersRouter = express.Router();

const usersController = new UsersController();
const requireAccessToken = new RequireAccessToken();

usersRouter.get('/me', requireAccessToken.requireAccessToken, usersController.getUser);

export { usersRouter }; 