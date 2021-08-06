import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BrandService } from '../brand/brand.service';
import { Brand } from '../brand/entities/brand.entity';
import { ClientsService } from '../clients/clients.service';
import { Client } from '../clients/entities/client.entity';
import { CreateAddressInput } from './dto/create-address.input';
import { FindAddressInput } from './dto/find-address.input';
import { UpdateAddressInput } from './dto/update-address.input';
import { Address } from './entities/address.entity';
import { City } from './entities/city.entity';
import { Neighborhood } from './entities/neighborhood.entity';
import { State } from './entities/state.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(Neighborhood)
    private neighborhoodRepository: Repository<Neighborhood>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(State)
    private stateRepository: Repository<State>,
    private brandService: BrandService,
    private clientService: ClientsService

  ) { }

  async createToBrand(data: CreateAddressInput): Promise<Address> {
    const state = await this.createState(data.state);
    const city = await this.createCity(data.city, state);
    const neighbor = await this.createNeighborhood(data.neighborhood, city);
    
    const address = await this.createAdress(
      data.publicPlace,
      data.number,
      data.complement,
      data.CEP,
      neighbor
    );
    const brand = await this.brandService.connectAddress(data.ownerID, address);

    return address;
  }
  async createToClient(data: CreateAddressInput): Promise<Address> {
    const state = await this.createState(data.state);
    const city = await this.createCity(data.city, state);
    const neighbor = await this.createNeighborhood(data.neighborhood, city);
    const client = await this.clientService.findOne(data.ownerID);
    const address = await this.createAdress(
      data.publicPlace,
      data.number,
      data.complement,
      data.CEP,
      neighbor
    );

    return address;
  }

  async createState(state: string): Promise<State> {
    let stateFound = await this.stateRepository.findOne({
      where: {
        name: Like('%' + state + "%")
      }
    });
    if (stateFound) {
      return stateFound
    }
    else {
      stateFound = this.stateRepository.create({ name: state })
      let stateCreated = await this.stateRepository.save(stateFound);
      if (!stateCreated) {
        throw new InternalServerErrorException('Problemas ao criar um estado');
      }
      return stateCreated;
    }
  }

  async createCity(city: string, state: State): Promise<City> {
    let cityFound = await this.cityRepository.findOne({
      where: {
        name: Like('%' + city + "%"),
        state
      }
    });
    if (cityFound) {
      return cityFound
    }
    else {
      cityFound = this.cityRepository.create({ name: city, state })
      let cityCreated = await this.cityRepository.save(cityFound);
      if (!cityCreated) {
        throw new InternalServerErrorException('Problemas ao criar uma cidade');
      }
      return cityCreated;
    }
  }

  async createNeighborhood(neighborhood: string, city: City): Promise<Neighborhood> {
    let neighborhoodFound = await this.neighborhoodRepository.findOne({
      where: {
        name: Like('%' + neighborhood + "%"),
        city
      }
    });
    if (neighborhoodFound) {
      return neighborhoodFound
    }
    else {
      neighborhoodFound = this.neighborhoodRepository.create({ name: neighborhood, city })
      let neighborhoodCreated = await this.neighborhoodRepository.save(neighborhoodFound);
      if (!neighborhoodCreated) {
        throw new InternalServerErrorException('Problemas ao criar um bairro');
      }
      return neighborhoodCreated;
    }
  }

  async createAdress(
    publicPlace: string,
    number: number,
    complement: string,
    CEP: string,
    neighborhood: Neighborhood
  ): Promise<Address> {
    const address = this.addressRepository.create({
        publicPlace,
        number,
        complement,
        CEP,
        neighborhood
      });
    const addressCreated = await this.addressRepository.save(address);

    if (!addressCreated) {
      throw new InternalServerErrorException('Problemas ao criar uma cidade');
    }
    return addressCreated;
  }

  async findAll(): Promise<Address[]> {
    return await this.addressRepository.find({
      relations: ['neighborhood', 'neighborhood.city', 'neighborhood.city.state']
    });
  }

  async findOne(data: FindAddressInput): Promise<Address> {
    let address: Address;
    let brand: Brand;
    let client: Client;
    if (data.brandID)
      brand = await this.brandService.findOne(data.brandID);
    if (data.clientID)
      client = await this.clientService.findOne(data.clientID);
    // try {
      address = await this.addressRepository.findOneOrFail({
        where: [
          { id: data.addressID },
          { id: brand?.addressID },
          { id: client?.addressID }
        ],
        relations: ['neighborhood', 'neighborhood.city', 'neighborhood.city.state']
      });
    // }
    // catch (err) {
    //   throw new NotFoundException('endereço não encontrado');
    // }
    return address;
  }


  update(id: string, data: UpdateAddressInput) {
    return `This action updates a #${id} address`;
  }

  remove(id: string) {
    return `This action removes a #${id} address`;
  }
}
