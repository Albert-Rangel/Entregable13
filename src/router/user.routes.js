import Router from "express"
import {
  changeRol,
}from '../dao/Mongo/UserManager.js'

const UserRouter = Router();

UserRouter.get('/premium/:uid', changeRol)

export default UserRouter;