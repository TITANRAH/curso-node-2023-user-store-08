import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    // como usare servicio aca conviene inicializar y pasarle el servicio de auth
    const authService = new AuthService();
    const controller = new AuthController(authService);

    // Definir las rutas
    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);
    router.get("/validate-email/:token", controller.validateEmail);
    return router;
  }
}
