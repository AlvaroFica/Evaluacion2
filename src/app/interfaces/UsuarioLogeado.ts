export interface UsuarioLogeado {
    id: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: "male" | "female";
    accessToken: string;
}