import * as process from "process";

export default () => ({
  server: {
    env: process.env.NODE_ENV,
    port: +process.env.PORT,
    basicUrl: process.env.BASIC_URL
  }
});