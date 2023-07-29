import { Transform } from 'class-transformer';
import { IsOptional, IsIn, IsArray, IsString } from 'class-validator';
import { PageOptionsParamForm } from 'src/common/forms';
import { InterviewStatus } from '../models';

export class InterviewPageOptionsParamForm extends PageOptionsParamForm {
  @IsOptional()
  @IsArray()
  @IsIn(Object.keys(InterviewStatus), {
    each: true,
  })
  @Transform(({ value }) => {
    if (typeof value === 'string' && value.length) {
      return [value];
    } else {
      return value;
    }
  })
  readonly status?: InterviewStatus[];

  @IsString()
  @IsIn(['createdAt', 'title', 'status'])
  @IsOptional()
  readonly sortBy?: string;
}
