import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/Auth.input';
import { AuthType } from './dto/auth.type';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(()=> AuthType)
  public async Login(
    @Args('data') data: AuthInput
  ): Promise<AuthType> {
    const response = await this.authService.validateUser(data);
    return{
      user: response.user,
      token: response.token
    }
  }
}
