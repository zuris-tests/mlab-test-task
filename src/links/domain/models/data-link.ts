import { IDataLinkRecordStructure } from "../repositories/interfaces/data-link-record-structure.interface";
import { IDataLink } from "./interfaces/data-link.interface";
import { IUpdateDataLink } from "./interfaces/update-data-link.interface";

export class DataLink implements IDataLink {
  private _uuid: string;
  private _data: string;
  private _used: boolean;

  get data(): string {
    return this._data;
  }

  set data(value: string) {
    this._data = value;
  }

  get uuid(): string {
    return this._uuid;
  }

  set uuid(value: string) {
    this._uuid = value;
  }


  get used(): boolean {
    return this._used;
  }

  set used(value: boolean) {
    this._used = value;
  }

  getData(): string {
    return this.data;
  }

  getID(): string {
    return this.uuid;
  }

  isUsed(): boolean {
    return this.used;
  }

  toJSON(): any {
    return {
      data: this.data
    }
  }

  constructor() {
    this._used = false;
  }

  toRecordStructure(): IDataLinkRecordStructure {
    return {
      data: this.data,
      id: this.uuid,
      used: this.used
    };
  }

  update(data: IUpdateDataLink): void {
    const {
      used = this.used
    } = data;

    this.used = used;
  }
}