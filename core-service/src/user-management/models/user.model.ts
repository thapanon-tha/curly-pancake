export class UserModel {
  id: string;
  name: string;
  imageUrl: string;

  constructor(data: Partial<UserModel>) {
    Object.assign(this, data);
  }
}
