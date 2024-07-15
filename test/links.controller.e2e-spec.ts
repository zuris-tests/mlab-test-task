import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { LinksModule } from "../src/links/links.module";
import { DataLinkUseCases } from "../src/links/domain/use-cases/data-link.use-cases";
import { ConfigModule } from "@nestjs/config";
import { configModuleOptions } from "../src/config/config-module-options";
import { DataLinkModuleInjectable } from "../src/links/enums/data-link-module-injectable.enum";
import { MockDataLinkRepository } from "../src/links/infrustructure/persistence/mocks/mock-data-link.repository";

describe('Links (e2e)', () => {
  let app: INestApplication;
  let linksUseCases: DataLinkUseCases;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        LinksModule,
        ConfigModule.forRoot(configModuleOptions)
      ],
      providers: [
        {
          provide: DataLinkModuleInjectable.DataLinkRepository,
          useClass: MockDataLinkRepository
        }
      ],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();

    linksUseCases = app.get<DataLinkUseCases>(DataLinkUseCases);
  });

  it('/links (GET) - get one that not found', () => {
    return request(app.getHttpServer())
      .get('/links/link-that-not-found')
      .expect(404);
  });

  it('/links (GET) - get one that exists', async () => {
    const url = await linksUseCases.createDataLink({
      data: 'test string'
    });
    return request(app.getHttpServer())
      .get(new URL(url).pathname)
      .expect(200);
  });

  it('/links (GET) - get one that is used', async () => {
    const url = await linksUseCases.createDataLink({
      data: 'test string'
    });
    const path = new URL(url).pathname;
    const id = path.split('/').pop();
    await linksUseCases.getLinkData({ id });
    return request(app.getHttpServer())
      .get(path)
      .expect(400);
  });

  it('/links (POST) - create new one', async () => {
    return request(app.getHttpServer())
      .post('/links')
      .send({
        value: 'test string'
      })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
