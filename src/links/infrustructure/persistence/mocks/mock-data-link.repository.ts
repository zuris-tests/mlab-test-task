import { IDataLinkRepository } from "../../../domain/repositories/interfaces/data-link-repository.interface";
import { Injectable } from "@nestjs/common";
import { IDataLink } from "../../../domain/models/interfaces/data-link.interface";
import { IDataLinkRecordStructure } from "../../../domain/repositories/interfaces/data-link-record-structure.interface";

@Injectable()
export class MockDataLinkRepository implements IDataLinkRepository {
  private readonly records: Map<string, IDataLinkRecordStructure> = new Map();
  constructor() {}

  async getLinkByID(id: string): Promise<IDataLinkRecordStructure> {
    return this.records.get(id);
  }

  async save(link: IDataLink): Promise<IDataLinkRecordStructure> {
    let record = this.records.get(link.getID());
    record = record ? Object.assign(record, link.toRecordStructure()) : Object.assign(link.toRecordStructure(), { id: link.getID() });
    this.records.set(record.id, record);
    return record;
  }
}