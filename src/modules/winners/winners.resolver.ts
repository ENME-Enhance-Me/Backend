import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WinnersService } from './winners.service';
import { Winner } from './entities/winner.entity';
import { CreateWinnerInput } from './dto/create-winner.input';
import { UpdateWinnerInput } from './dto/update-winner.input';

@Resolver(() => Winner)
export class WinnersResolver {
  constructor(private readonly winnersService: WinnersService) {}

  @Mutation(() => Winner)
  createWinner(@Args('data') data: CreateWinnerInput) {
    return this.winnersService.create(data);
  }

  // @Query(() => [Winner], { name: 'findAllWinners' })
  findAll() {
    return this.winnersService.findAll();
  }

  @Query(() => Winner, { name: 'findOneWinner' })
  findOne(@Args('id') id: string) {
    return this.winnersService.findOne(id);
  }

  // @Mutation(() => Winner)
  updateWinner(@Args('data') data: UpdateWinnerInput) {
    return this.winnersService.update(data.id, data);
  }

  @Mutation(() => Winner)
  removeWinner(@Args('id') id: string) {
    return this.winnersService.remove(id);
  }
}
