import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BrandService } from '../brand/brand.service';
import { ClientsService } from '../clients/clients.service';
import { CreateClientbrandInput } from './dto/create-clientbrand.input';
import { UpdateClientbrandInput } from './dto/update-clientbrand.input';
import { Clientbrand } from './entities/clientbrand.entity';

@Injectable()
export class ClientbrandService {

  constructor(
    @InjectRepository(Clientbrand)
    private readonly clientbrandRepository: Repository<Clientbrand>,
    private readonly clientService: ClientsService,
    private readonly brandService: BrandService
  ) { }

  async create(data: CreateClientbrandInput): Promise<Clientbrand> {
    const client = await this.client(data.clientID);

    if (!client) {
      throw new NotFoundException('cliente não encontrado');
    }

    const brand = await this.brand(data.brandID);

    if (!brand) {
      throw new NotFoundException('marca não encontrado');
    }

    const clientBrand = this.clientbrandRepository.create({
      isClient: data.isClient,
      isVIP: data.isVIP,
      mCoins: 0,
      brand,
      client
    });

    const clientBrandSaved = await this.clientbrandRepository.save(clientBrand);

    if (!clientBrandSaved) {
      throw new InternalServerErrorException('Problema ao criar uma relação entre marca e cliente');
    }

    return clientBrandSaved;
  }

  async findAll() {
    return await this.clientbrandRepository.find();
  }

  async findOne(id: string) {
    return await this.clientbrandRepository.findOneOrFail(id);
  }

  async findAllToBrand(brandID: string) {
    const brand = await this.brand(brandID)

    const clientBrands = await this.clientbrandRepository.find({
      where: {
        brand
      },
    });

    return clientBrands;
  }

  async findAllToClient(clientID: string) {
    const client = await this.client(clientID)

    const clientBrands = await this.clientbrandRepository.find({
      where: {
        client
      },
    });
    return clientBrands;
  }

  async update(id: string, data: UpdateClientbrandInput) {
    const clientBrand = await this.findOne(id);

    if (!clientBrand) {
      throw new NotFoundException('relação cliente marca não encontrada');
    }
    this.clientbrandRepository.merge(clientBrand, data);
    const clientBrandUpdated = await this.clientbrandRepository.save(clientBrand);
    return clientBrandUpdated;
  }

  async remove(id: string) {
    const clientbrand = await this.findOne(id);
    return (await this.clientbrandRepository.remove(clientbrand)) ? true : false;
  }

  async brand(brandID: string) {
    return await this.brandService.findOne(brandID);
  }
  async client(clientID: string) {
    return await this.clientService.findOne(clientID);
  }
}
