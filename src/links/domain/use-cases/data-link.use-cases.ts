import { IDataLinkService } from "../services/interfaces/data-link-service.interface";
import { ICaseCreateDataLink } from "./interfaces/case-create-data-link.interface";
import { ICaseGetLink } from "./interfaces/case-get-link.interface";
import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DataLinkModuleInjectable } from "../../enums/data-link-module-injectable.enum";
import { ConfigService } from "@nestjs/config";
import { IServerConfig } from "../../../config/interfaces/server-config.interface";

@Injectable()
export class DataLinkUseCases {
  private readonly basicLinkURL: string;

  constructor(
    @Inject(DataLinkModuleInjectable.DataLinkService)
    private readonly dataLinkService: IDataLinkService,
    private readonly configService: ConfigService
  ) {
    const serverConfig = configService.get<IServerConfig>('server');
    this.basicLinkURL = `${serverConfig.basicUrl}/links`;
  }

  async createDataLink(data: ICaseCreateDataLink): Promise<string> {
    const link = await this.dataLinkService.createLink(data);
    return link && `${this.basicLinkURL}/${link.getID()}`;
  }

  async getLinkData(options: ICaseGetLink): Promise<string> {
    const link = await this.dataLinkService.getLink(options);
    if (!link) {
      throw new NotFoundException('Wrong URL');
    }

    if (link.isUsed()) {
      throw new BadRequestException('Data link has already been used');
    }

    await this.dataLinkService.updateLink(link, { used: true });

    return link.getData();
  }
}