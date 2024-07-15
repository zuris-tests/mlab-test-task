export interface IServerConfig {
  env: "development" | "production" | "local" | "test";

  port: number;

  basicUrl: string;
}