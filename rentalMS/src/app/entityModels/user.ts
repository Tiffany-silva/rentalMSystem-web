export enum Role {
  ADMIN = 'ROLE_ADMIN',
  LESSEE = 'ROLE_LESSEE',
  LESSOR = 'ROLE_LESSOR',
}


export class User {

  private id: number;
  private name: string;
  private username: string;
  private email: string;
  private password: string;
  private role: Role[];
  private _imageURL:String;

  constructor(){
  }


  get imageURL(): String {
    return this._imageURL;
  }

  set imageURL(value: String) {
    this._imageURL = value;
  }

  get _username(): string {
    return this.username;
  }

  set _username(value: string) {
    this.username = value;
  }
  get _id(): number {
    return this.id;
  }

  set _id(value: number) {
    this.id = value;
  }

  get _name(): string {
    return this.name;
  }

  set _name(value: string) {
    this.name = value;
  }

  get _email(): string {
    return this.email;
  }

  set _email(value: string) {
    this.email = value;
  }

  get _password(): string {
    return this.password;
  }

  set _password(value: string) {
    this.password = value;
  }

  get _role(): Role[] {
    return this.role;
  }

  set _role(value: Role[]) {
    this.role = value;
  }
}
