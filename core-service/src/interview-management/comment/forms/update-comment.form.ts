import { IsString } from 'class-validator';

export class UpdateCommentForm {
  @IsString()
  message: string;
}
