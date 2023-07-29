import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min, IsIn } from 'class-validator';

import { Prisma } from '@prisma/client';

export class PageOptionsParamForm {
  @IsString()
  @IsOptional()
  readonly sortBy?: string;

  @IsOptional()
  @IsIn([Prisma.SortOrder.asc, Prisma.SortOrder.desc])
  readonly sortOrder?: Prisma.SortOrder = Prisma.SortOrder.asc;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(500)
  @IsOptional()
  readonly take?: number = 50;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
