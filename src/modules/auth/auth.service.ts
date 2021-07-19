import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { AuthInput } from './dto/Auth.input';
import { AuthBrandType } from './dto/auth-brand.type';
import { BrandService } from '../brand/brand.service';
import { Brand } from '../brand/entities/brand.entity';
import { Client } from '../clients/entities/client.entity';
import { AuthClientType } from './dto/auth-Client.type';
import { ClientsService } from '../clients/clients.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private brandService: BrandService,
        private clientService: ClientsService,
        private jwtService: JwtService
    ) { }

    async validateBrand(data: AuthInput): Promise<AuthBrandType> {
        let brand: Brand;
        let user: User;
        try {
            user = await this.userService.find({ email: data.Email });
            brand = await this.brandService.findOne(user.brandId);
        }
        catch (err) {
            throw new NotFoundException('usuário e/ou senha inválidos');
        }
        const validPassword = compareSync(data.Password, user.password);

        if (!validPassword) {
            throw new UnauthorizedException('usuário e/ou senha inválidos');
        }
        const token = await this.jwtToken(brand);
        return {
            brand,
            token
        }
    }

    async validateClient(data: AuthInput): Promise<AuthClientType> {
        let client: Client;
        try {
            client = await this.clientService.find({ email: data.Email });
        }
        catch (err) {
            throw new NotFoundException('usuário e/ou senha inválidos');
        }
        const validPassword = compareSync(data.Password, client.user.password);

        if (!validPassword) {
            throw new UnauthorizedException('usuário e/ou senha inválidos');
        }
        const token = await this.jwtToken(null, client);
        return {
            client,
            token
        }
    }

    private async jwtToken(brand?: Brand, client?: Client): Promise<string> {
        let payload: any;
        if (brand) {
            payload = { companyName: brand.company_name, sub: brand.id };

        }
        if (client) {
            payload = { FirstName: client.firstname, LastName: client.lastname, sub: client.id };
        }
        return await this.jwtService.signAsync(payload);
    }
}
