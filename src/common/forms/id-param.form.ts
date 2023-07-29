import { IsUUID } from 'class-validator';

export class IdParamForm {
  @IsUUID()
  id: string;
}
