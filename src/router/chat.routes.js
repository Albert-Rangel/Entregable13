import express, { Router } from "express"
import userpermissionsRoutes from '../dao/middlewares/userpermissionsRoutes.js';
import privateRoutes from '../dao/middlewares/privateRoutes.js';

const router = express.Router()

router.get("/", privateRoutes, userpermissionsRoutes,  async (req, res) => {
    res.render("chat",{style: "chat.css"})
})

export default router
