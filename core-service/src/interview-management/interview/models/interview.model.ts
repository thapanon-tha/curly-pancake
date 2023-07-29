import { UserModel } from 'src/user-management/models';

export enum InterviewStatus {
  TODO = 'TODO',
  INPROGRESS = 'INPROGRESS',
  DONE = 'DONE',
}
export class InterviewModel {
  id: string;
  title: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  status: InterviewStatus;
  creatorId: string;

  creator?: UserModel;

  constructor(data: Partial<InterviewModel>) {
    Object.assign(this, data);
  }
}
