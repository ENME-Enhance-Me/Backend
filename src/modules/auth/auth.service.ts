import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthInput } from './dto/Auth.input';
import { AuthType } from './dto/auth.type';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
        ) {}

    async validateUser(data: AuthInput): Promise<AuthType> {
        const user = await this.userService.find({email: data.Email});

        const validPassword = compareSync(data.Password, user.password);

        if(!validPassword) {
            throw new UnauthorizedException('Senha incorreta');
        }
        const token = await this.jwtToken(user);
        return {
            user, 
            token
        }
    }

    private async jwtToken(user: User): Promise<string> {
        const payload = { UserName: user.username, sub: user.id };
        return await this.jwtService.signAsync(payload);
    }
}
