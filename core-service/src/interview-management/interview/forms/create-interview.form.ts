import { IsString, IsOptional, IsUUID, IsIn } from 'class-validator';
import { InterviewStatus } from '../models';

export class CreateInterviewForm {
  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsIn(Object.keys(InterviewStatus))
  status: string;

  @IsUUID()
  creatorId: string;
}
