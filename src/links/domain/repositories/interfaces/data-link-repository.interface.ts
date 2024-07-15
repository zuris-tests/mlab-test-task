import { IDataLinkRecordStructure } from "./data-link-record-structure.interface";
import { IDataLink } from "../../models/interfaces/data-link.interface";

export interface IDataLinkRepository {
  save(link: IDataLink): Promise<IDataLinkRecordStructure>;

  getLinkByID(id: string): Promise<IDataLinkRecordStructure>;
}