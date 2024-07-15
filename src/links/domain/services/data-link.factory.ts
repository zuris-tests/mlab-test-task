import { ICreateDataLink } from "./interfaces/create-data-link.interface";
import { IDataLink } from "../models/interfaces/data-link.interface";
import { DataLink } from "../models/data-link";
import { IDataLinkRecordStructure } from "../repositories/interfaces/data-link-record-structure.interface";
import { v4 as uuidv4 } from 'uuid';

export class DataLinkFactory {
  static newDataLink(data: ICreateDataLink): IDataLink {
    const link = new DataLink();
    link.data = data.data;
    link.uuid = uuidv4();

    return link;
  }

  static fromStructure(data: IDataLinkRecordStructure): IDataLink {
    const link = new DataLink();
    link.uuid = data.id;
    link.data = data.data;
    link.used = data.used;

    return link;
  }
}