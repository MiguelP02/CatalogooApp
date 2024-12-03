export class User{
    constructor(
        public id: number,
        public nombre: string,
        public email: string,
        public role: string,
        public password: string,
        public token?: string
    ){}
}