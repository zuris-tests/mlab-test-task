import { IsNotEmpty, IsString } from "class-validator";

export class CreateDataLinkDto {
  @IsString()
  @IsNotEmpty()
  value: string;
}