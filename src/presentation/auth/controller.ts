import { Request, Response } from "express";
import { CustomError, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";

export class AuthController {
  // aca inyecto el servicio creado
  // y lo inyecto inicializo en el router de endpoint ademas lo pedira
  constructor(public readonly authService: AuthService) {}

  // este handle error regresa el custom error o el status
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${error}`);
    return res.status(500).json({ error: "Internal server error" });
  };

  registerUser = (req: Request, res: Response) => {
    // como el dto regresa la instancia mas el error desestructuro ese arreglo y saco el error y el dto
    const [error, registerDto] = RegisterUserDto.create(req.body);
    // console.log(registerDto)

    if (error) return res.status(400).json({ error });

    // mando a llamar el servicio creado y le paso el dto si no hay error 
    // y es el servicio el que guarda finalmente si es una promesa 
    // al guardar envio la respuesta como json
    this.authService.registerUser(registerDto!)
    .then((user) => res.json(user))
    .catch(error => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    res.json("loginUser");
  };
  validateEmail = (req: Request, res: Response) => {
    res.json("validateEmail");
  };
}



// el dto regrsa una instancia que contiene los parametros que necesito guardar 
// es una instancia de RegistgerUserDto

// en el servicio reviso si ese dto que recibe  si existe en en bd a traves de su email
// si no existe digo que una contante user es igual al modelo userModel de mongoose al que le paso el dto 
// luego guardo en bd esa variable user 
// en la isma funcion del servicio destructuro el password de lo demas para el regreso en json const { password, ...userEntity } = UserEntity.fromObject(user);
// asi puedo devolverlo asi  ademas con un token return { 
    //     user: userEntity, 
    //     token: "ABC" 
    // };
// ahora llamo a este servicio en el controlador 

//primero corroboro que vien een el body lo que necesito y destructuro error y la data en ete caso le puse registerDto const [error, registerDto] = RegisterUserDto.create(req.body); 
// si no hay error llamo al servicio que hace lo de arriba con el dto que se le pase 
// si sale todo bein realiza lo que el servicio hace que es finalmente guardar en base dedatos
// si no lanzara un error creado y que se llama a traves del handoleError