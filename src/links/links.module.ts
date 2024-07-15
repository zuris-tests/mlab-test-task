import { Module } from "@nestjs/common";
import { DataLinkModuleInjectable } from "./enums/data-link-module-injectable.enum";
import { DataLinkService } from "./domain/services/data-link.service";
import { DataLinkUseCases } from "./domain/use-cases/data-link.use-cases";
import { MockDataLinkRepository } from "./infrustructure/persistence/mocks/mock-data-link.repository";
import { LinksController } from './application/controllers/links.controller';

@Module({
  providers: [
    {
      provide: DataLinkModuleInjectable.DataLinkRepository,
      useClass: MockDataLinkRepository //here we can place a real implementation
    },
    {
      provide: DataLinkModuleInjectable.DataLinkService,
      useClass: DataLinkService
    },
    DataLinkUseCases
  ],
  controllers: [LinksController]
})
export class LinksModule {}
