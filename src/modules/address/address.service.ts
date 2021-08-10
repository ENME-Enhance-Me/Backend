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

    const address = await this.createAddress(
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

    const address = await this.createAddress(
      data.publicPlace,
      data.number,
      data.complement,
      data.CEP,
      neighbor
    );
    const client = await this.clientService.connectAddress(data.ownerID, address);

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

  async createAddress(
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
    try {
      address = await this.addressRepository.findOne({
        where: [
          { id: data.addressID },
          { id: brand?.addressID },
          { id: client?.addressID }
        ],
        relations: ['neighborhood', 'neighborhood.city', 'neighborhood.city.state']
      });
    }
    catch (err) {
      throw new NotFoundException('endereço não encontrado');
    }
    return address;
  }


  async updateAddressToBrand(id: string, data: UpdateAddressInput): Promise<Address> {
    const brand = await this.brandService.findOne(id);
    const address = await this.update(brand.addressID, data);
    return address;
  }

  async updatedAddressToClient(id: string, data: UpdateAddressInput): Promise<Address> {
    const client = await this.clientService.findOne(id);
    const address = await this.update(client.addressID, data);
    return address;
  }

  async update(id: string, data: UpdateAddressInput): Promise<Address> {
    let addressUpdated: Address;
    let address = await this.findOne({ addressID: id });
    let cityUpdated: City;
    let neighborhoodUpdated: Neighborhood;

    if (data.complement || data.number || data.publicPlace || data.CEP) {
      this.addressRepository.merge(address, { complement: data.complement, number: data.number, publicPlace: data.publicPlace, CEP: data.CEP });
      addressUpdated = await this.addressRepository.save(address);
    }
    if (data.state) {
      const stateUpdated = await this.updateState(data.state);
      if (data.city) {
        cityUpdated = await this.updateCity(data.city, stateUpdated);
      }
      else {
        cityUpdated = await this.updateCity(address.neighborhood.city.name, stateUpdated);
      }
      if (data.neighborhood) {
        neighborhoodUpdated = await this.updateNeighborhood(data.neighborhood, cityUpdated);
      }
      else {
        neighborhoodUpdated = await this.updateNeighborhood(address.neighborhood.name, cityUpdated);
      }
    }
    else if (data.city) {
      cityUpdated = await this.updateCity(data.city, address.neighborhood.city.state);
      if (data.neighborhood) {
        neighborhoodUpdated = await this.updateNeighborhood(data.neighborhood, cityUpdated);
      }
      else {
        neighborhoodUpdated = await this.updateNeighborhood(address.neighborhood.name, cityUpdated);
      }
    }
    else if (data.neighborhood) {
      neighborhoodUpdated = await this.updateNeighborhood(data.neighborhood, address.neighborhood.city);
     
    }
    this.addressRepository.merge(address, { neighborhood: neighborhoodUpdated });
    addressUpdated = await this.addressRepository.save(address);
    return addressUpdated;
  }


  async updateNeighborhood(name: string, city: City): Promise<Neighborhood> {
    let neighborhoodUpdated: Neighborhood;
    try {
      neighborhoodUpdated = await this.neighborhoodRepository.findOneOrFail({
        where: {
          city,
          name: Like("%" + name + "%")
        }
      });
    }
    catch {
      neighborhoodUpdated = await this.createNeighborhood(name, city);
    }
    return neighborhoodUpdated;
  }

  async updateCity(name: string, state: State): Promise<City> {
    let cityUpdated: City;
    try {
      cityUpdated = await this.cityRepository.findOneOrFail({
        where: {
          state,
          name: Like("%" + name + "%")
        }
      });
    }
    catch {
      cityUpdated = await this.createCity(name, state);
    }
    return cityUpdated;
  }

  async updateState(name: string): Promise<State> {
    let stateUpdated: State;
    try {
      stateUpdated = await this.stateRepository.findOneOrFail({
        where: {
          name: Like("%" + name + "%")
        }
      });
    }
    catch {
      stateUpdated = await this.createState(name);
    }
    return stateUpdated;
  }


  async remove(id: string) {
    const address = await this.findOne({ addressID: id });
    return (await this.addressRepository.remove(address)) ? true : false;
  }
}
