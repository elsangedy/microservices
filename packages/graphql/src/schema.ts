/* tslint:disable */
export class SigninInput {
    email?: string;
    password?: string;
}

export class SignupInput {
    name?: string;
    email?: string;
    password?: string;
}

export class Auth {
    token?: string;
    user?: User;
}

export abstract class IMutation {
    abstract signin(data?: SigninInput): Auth | Promise<Auth>;

    abstract signup(data?: SignupInput): Auth | Promise<Auth>;
}

export abstract class IQuery {
    abstract me(): User | Promise<User>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class User {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}
