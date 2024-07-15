import * as Joi from '@hapi/joi';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import serverConfig from './server.config';

export const configModuleOptions: ConfigModuleOptions = {
  validationSchema: Joi.object({
    /**
     * Defines the main operating mode of the application
     */
    NODE_ENV: Joi.string()
      .valid('development', 'production', 'local', 'test')
      .default('local'),
    /**
     * Port number that the server will listen on
     */
    PORT: Joi.number().default(3000),
    /**
     * Secret word for JWT
     */
    BASIC_URL: Joi.string().default('http://localhost:3000')
  }),
  isGlobal: true,
  load: [
    serverConfig
  ],
};
