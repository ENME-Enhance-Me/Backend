import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Research } from "../research/entities/research.entity";
import PeopleGroup from "./entities/people-group.entity";

@Injectable()
export class PeopleGroupService {
    constructor(
        @InjectRepository(PeopleGroup)
        private readonly PeopleGroupRepository: Repository<PeopleGroup>,
    ) { }

    async create(name: string): Promise<PeopleGroup>{
        const pg = this.PeopleGroupRepository.create({name});

        const pgSaved = await this.PeopleGroupRepository.save(pg);

        return pgSaved;
    }
}