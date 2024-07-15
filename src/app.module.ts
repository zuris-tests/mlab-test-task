import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { ConfigModule } from "@nestjs/config";
import { configModuleOptions } from "./config/config-module-options";

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    LinksModule
  ]
})
export class AppModule {}
