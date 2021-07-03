import { hashSync } from "bcrypt"
import { from } from "rxjs";

export const hashPasswordTransform = {
    to(password: string): string {
        return hashSync(password, 10);
    },
    from(hash: string): string {
        return hash;
    }
}