import { userModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {
  constructor() {}

  // recibo el dto que se genera en el controlador
  public async registerUser(registerUserDto: RegisterUserDto) {
    // verifico si existe el usuario por su email
    const existUser = await userModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest("Email already exist");

    // aqui creo en la base de datos
    try {

    // le paso el dto que reciba como parametro al user model
      const user = new userModel(registerUserDto);
    // guardo ese user model que es el dto que recibio con todas las propiedades
      await user.save();

      //encriptar contraseña

      //jwt para mantener la autenticación del usuario

      // email de cconfirmacion

      //   aqui no regreso el user si no la entidad creada para la app
      //  pero la desestructuro para no devolver el password
      const { password, ...userEntity } = UserEntity.fromObject(user);

    //   ahora regreso solo el user entity sin password mas el token separado
      return { 
        user: userEntity, 
        token: "ABC" 
    };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }

    // return "todo ok!";
  }
}
