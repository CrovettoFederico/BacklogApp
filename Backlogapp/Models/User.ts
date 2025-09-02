export interface IUser {
    id?: string;
    phoneId?: string;
}

export class User implements IUser {    
    constructor(
        public id?: string,
        public phoneId?: string
    ) {}
}