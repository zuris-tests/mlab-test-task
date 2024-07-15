import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { DataLinkUseCases } from "../../domain/use-cases/data-link.use-cases";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { GetByIdDto } from "../dto/get-by-id.dto";
import { CreateDataLinkDto } from "../dto/create-data-link.dto";

@ApiTags('links')
@Controller('links')
export class LinksController {
  constructor(
    private readonly dataLinkUseCases: DataLinkUseCases
  ) {}

  @ApiOperation({ summary: 'Get one-time link data' })
  @Get(':id')
  async getLinkDataByURL(@Param() params: GetByIdDto): Promise<string> {
    return this.dataLinkUseCases.getLinkData({ id: params.id });
  }


  @ApiOperation({ summary: 'Create new one-time link for data' })
  @Post()
  async createDataLink(@Body() body: CreateDataLinkDto): Promise<string> {
    return this.dataLinkUseCases.createDataLink({ data: body.value });
  }
}
