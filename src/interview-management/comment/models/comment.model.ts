import { UserModel } from 'src/user-management/models';

export class CommentModel {
  id: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  interviewId: string;
  userId: string;

  user?: UserModel;

  constructor(data: Partial<CommentModel>) {
    Object.assign(this, data);
  }
}
