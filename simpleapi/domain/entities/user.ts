export class User {
    constructor (
        public readonly id : number,
        private password : string ,
        public email : string ,
        public name : string
    ) {}
    public password_setter (password : string) {
        this.password = password;
    }
}