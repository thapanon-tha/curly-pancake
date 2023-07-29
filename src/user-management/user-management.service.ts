import { Injectable } from '@nestjs/common';
import { UserRepository } from './user-management.repo';
import { CreateUserForm, UpdateUserForm } from './forms';

@Injectable()
export class UserManagementService {
  constructor(private readonly userRepo: UserRepository) {}
  create(payload: CreateUserForm) {
    try {
      return this.userRepo.create(payload);
    } catch (e) {
      console.error(e);
    }
  }

  findAll() {
    return this.userRepo.gets();
  }

  findOne(id: string) {
    return this.userRepo.getById(id);
  }

  update(id: string, payload: UpdateUserForm) {
    return this.userRepo.update(id, payload);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} userManagement`;
  // }
}
