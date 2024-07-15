import { IDataLink } from "../../models/interfaces/data-link.interface";
import { ICreateDataLink } from "./create-data-link.interface";
import { IGetLink } from "./get-link.interface";
import { IUpdateDataLink } from "./update-data-link.interface";

export interface IDataLinkService {
  createLink(data: ICreateDataLink): Promise<IDataLink>;

  updateLink(link: IDataLink, data: IUpdateDataLink): Promise<IDataLink>;

  getLink(options: IGetLink): Promise<IDataLink>;
}