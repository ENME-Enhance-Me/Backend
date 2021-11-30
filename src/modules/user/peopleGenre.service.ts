import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import PeopleGenre from "./entities/people-genre.entity";

@Injectable()
export class PeopleGenreService {
    constructor(
        @InjectRepository(PeopleGenre)
        private readonly PeopleGenreRepository: Repository<PeopleGenre>,
    ) { }

    async create(name: string): Promise<PeopleGenre>{
        const pg = this.PeopleGenreRepository.create({name});

        const pgSaved = await this.PeopleGenreRepository.save(pg);

        return pgSaved;
    }
}