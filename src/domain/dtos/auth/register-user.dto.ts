// el objetivo es una especie de validacion de propiedades

import { regularExps } from "../../../config";
// utilizare este dto en el controller primeramente ahi se llama 
// cuando necesite la instancia en cualquier lugar pasara por las validaciones
export class RegisterUserDto {
  constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  // recibe cualquier objeto literal
//   esto regresara [string?, RegisterUserDto]
  static create(object: {[key: string]: any}): [string?, RegisterUserDto?]{
   
    console.log('entro a create');
    
   
    const {name, email, password} = object;

    // valido que vengan estas propiedades
    if( !name) return ['Missing name'];
    if( !email) return ['Missing email'];
    if( !regularExps.email.test(email)) return ['Email is not valid'];
    if( !password) return ['Missing password'];
    if( password.length < 6) return ['Password to short'];

    // si todo sale bien regreso la instancia con sus propiedades
    return [undefined, new RegisterUserDto(name, email, password)]
    
}
}
