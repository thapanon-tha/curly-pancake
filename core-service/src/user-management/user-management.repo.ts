import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User as UserPrisma } from '@prisma/client';
import { UserModel } from './models';
import { CreateUserForm, UpdateUserForm } from './forms';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  convertToModel(user: UserPrisma): UserModel {
    return new UserModel({
      id: user.id,
      imageUrl: user.imageUrl,
      name: user.name,
    });
  }

  async gets(): Promise<UserModel[]> {
    const data = await this.prisma.user.findMany();
    return data.map((e) => this.convertToModel(e));
  }

  async getById(id: string): Promise<UserModel> {
    const data = await this.prisma.user.findFirstOrThrow({
      where: {
        id,
      },
    });
    return this.convertToModel(data);
  }

  async create(payload: CreateUserForm): Promise<UserModel> {
    const data = await this.prisma.user.create({
      data: {
        name: payload.name,
        imageUrl: payload.imageUrl,
      },
    });
    return this.convertToModel(data);
  }

  async update(id: string, payload: UpdateUserForm): Promise<UserModel> {
    const data = await this.prisma.user.update({
      data: {
        ...(payload.name ? { name: payload.name } : {}),
        ...(payload.imageUrl ? { name: payload.imageUrl } : {}),
      },
      where: {
        id: id,
      },
    });
    return this.convertToModel(data);
  }
}
