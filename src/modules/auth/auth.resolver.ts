import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/Auth.input';
import { AuthBrandType } from './dto/auth-brand.type';
import { AuthClientType } from './dto/auth-Client.type';
import { BadRequestException } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(()=> AuthBrandType, {
    description: 'Efetua login de uma marca'
  })
  public async LoginBrand(
    @Args('data') data: AuthInput
  ): Promise<AuthBrandType> {
    if(data.Email === "" || data.Password === ""){
      throw new BadRequestException('Preencha os campos de e-mail e senha.');
    }
    const response = await this.authService.validateBrand(data);
    return{
      brand: response.brand,
      user: response.user,
      token: response.token
    }
  }

  @Mutation(()=> AuthClientType, {
    description: 'Efetua login de um cliente'
  })
  public async LoginClient(
    @Args('data') data: AuthInput
  ): Promise<AuthClientType> {
    const response = await this.authService.validateClient(data);
    return{
      client: response.client,
      token: response.token
    }
  }
}