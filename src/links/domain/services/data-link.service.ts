import { IDataLinkService } from "./interfaces/data-link-service.interface";
import { IDataLinkRepository } from "../repositories/interfaces/data-link-repository.interface";
import { DataLinkModuleInjectable } from "../../enums/data-link-module-injectable.enum";
import { Inject, Injectable } from "@nestjs/common";
import { ICreateDataLink } from "./interfaces/create-data-link.interface";
import { IGetLink } from "./interfaces/get-link.interface";
import { IDataLink } from "../models/interfaces/data-link.interface";
import { DataLinkFactory } from "./data-link.factory";
import { IUpdateDataLink } from "./interfaces/update-data-link.interface";

@Injectable()
export class DataLinkService implements IDataLinkService {
  constructor(
    @Inject(DataLinkModuleInjectable.DataLinkRepository)
    private readonly dataLinkRepository: IDataLinkRepository
  ) {}

  async createLink(data: ICreateDataLink): Promise<IDataLink> {
    const newLink = DataLinkFactory.newDataLink(data);
    const record = await this.dataLinkRepository.save(newLink);
    return DataLinkFactory.fromStructure(record);
  }

  async updateLink(link: IDataLink, data: IUpdateDataLink): Promise<IDataLink> {
    link.update(data);
    await this.dataLinkRepository.save(link);
    return link;
  }

  async getLink(options: IGetLink): Promise<IDataLink> {
    const record = await this.dataLinkRepository.getLinkByID(options.id);
    return record && DataLinkFactory.fromStructure(record);
  }
}