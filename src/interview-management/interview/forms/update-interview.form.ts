import { IsString, IsOptional, IsIn, IsUUID } from 'class-validator';
import { InterviewStatus } from '../models';

export class UpdateInterviewForm {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  message: string;

  @IsOptional()
  @IsIn(Object.keys(InterviewStatus))
  status: string;

  @IsOptional()
  @IsUUID()
  creatorId: string;
}
