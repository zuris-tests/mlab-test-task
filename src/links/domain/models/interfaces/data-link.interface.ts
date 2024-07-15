import { IDataLinkRecordStructure } from "../../repositories/interfaces/data-link-record-structure.interface";
import { IUpdateDataLink } from "./update-data-link.interface";

export interface IDataLink {
  getData(): string;

  getID(): string;

  isUsed(): boolean;

  update(data: IUpdateDataLink): void;

  toRecordStructure(): IDataLinkRecordStructure;
}