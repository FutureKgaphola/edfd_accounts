import jwt from 'jsonwebtoken';
const MaxAge = 2 * 24 * 60 * 60;
export const CreateToken = (id:string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET ?? "", { expiresIn: "1d" });
}