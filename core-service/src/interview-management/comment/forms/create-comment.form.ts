import { IsString, IsUUID } from 'class-validator';

export class CreateCommentForm {
  @IsString()
  message: string;

  @IsUUID()
  userId: string;

  constructor(data: Partial<CreateCommentForm>) {
    Object.assign(this, data);
  }
}

export class CreateCommentWithInterwireForm extends CreateCommentForm {
  @IsUUID()
  interviewId: string;

  constructor(data: Partial<CreateCommentWithInterwireForm>) {
    super(data);
    Object.assign(this, data);
  }
}
