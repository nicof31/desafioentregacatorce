import { Router } from "express";
import { passportCall } from "../utils/jwt.js";
import handlePolicies from "../middleware/handle-policies.middleware.js"
import SessionController from "../controllers/session.controller.js"
import validateSchema from "../middleware/validate-dto.middleware.js";
import { SESSION_REGISTER_DTO, SESSION_RECOVER_DTO } from "../dto/dtoManager.js";


const router = Router();
const sessController = new SessionController();

//--------RUTA ALTA USUARIO ---------------
    router.post("/register", [validateSchema(SESSION_REGISTER_DTO)], sessController.allToRegister);

//--------EMAILRECOVER----------------
    router.post("/emailrecover", sessController.emailRecover); 

//--------RECOVER----------------
    router.post("/recover-psw", [validateSchema(SESSION_RECOVER_DTO)],sessController.recoverUser);

//--------RUTA INICIO DE SESION POR TOKEN----------------
    router.post("/login", sessController.loginUser);

//--------LOGIN GITHUB---------------
 
    router.get("/github", sessController.loginGitHub);
    router.get("/github/callback", sessController.githubCallback);

//--------LOG OUT----------------
    router.get("/logout", sessController.logoutUser);

//-----CURRENT---------------------------------
    router.get("/current", [passportCall("jwt"), handlePolicies(["ADMIN", "USER"])], sessController.getCurrentUserInfo);

//-----TICKETS COMPRA---------------------------------
    router.get("/tickets", [passportCall("jwt"), handlePolicies(["ADMIN", "USER"])], sessController.getTicketsByUser);

//-----CHANGE ROLE---------------------------------   
    router.get("/premium/:uid", [passportCall("jwt"), handlePolicies(["USER","ADMIN","PREMIUM"])], sessController.getUserRole);
    router.post("/premium/:uid",[passportCall("jwt"), handlePolicies(["USER","ADMIN","PREMIUM"])], sessController.changeRole);


export default router