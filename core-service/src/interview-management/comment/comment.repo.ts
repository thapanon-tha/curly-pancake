import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Comment as CommentPrisma } from '@prisma/client';
import { CreateCommentWithInterwireForm, UpdateCommentForm } from './forms';
import { CommentModel } from './models';
import { UserModel } from 'src/user-management/models';

const commentWithUser = Prisma.validator<Prisma.CommentArgs>()({
  include: {
    users: true,
  },
});

type CommentWithUser = Prisma.CommentGetPayload<typeof commentWithUser>;

@Injectable()
export class CommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  convertToModel(comment: CommentPrisma | CommentWithUser): CommentModel {
    const users =
      'users' in comment
        ? new UserModel({
            id: comment.users['id'],
            imageUrl: comment.users['imageUrl'],
            name: comment.users['name'],
          })
        : null;

    return new CommentModel({
      id: comment.id,
      message: comment.message,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      interviewId: comment.interviewId,
      userId: comment.userId,
      user: users,
    });
  }

  async gets(interviewId: string): Promise<CommentModel[]> {
    const data = await this.prisma.comment.findMany({
      where: {
        interviewId: interviewId,
      },
      include: {
        users: true,
      },
    });
    return data.map((e) => this.convertToModel(e));
  }

  async getById(interviewId: string, id: string): Promise<CommentModel> {
    const data = await this.prisma.comment.findFirstOrThrow({
      where: {
        id,
        interviewId,
      },
      include: {
        users: true,
      },
    });
    return this.convertToModel(data);
  }

  async create(payload: CreateCommentWithInterwireForm): Promise<CommentModel> {
    const data = await this.prisma.comment.create({
      data: {
        message: payload.message,
        interviewId: payload.interviewId,
        userId: payload.userId,
      },
      include: {
        users: true,
      },
    });
    return this.convertToModel(data);
  }

  async update(
    interviewId: string,
    id: string,
    payload: UpdateCommentForm,
  ): Promise<CommentModel> {
    const data = await this.prisma.comment.update({
      data: {
        message: payload.message,
      },
      where: {
        id: id,
        interviewId,
      },
      include: {
        users: true,
      },
    });
    return this.convertToModel(data);
  }

  async delete(interviewId: string, id: string): Promise<CommentModel> {
    const data = await this.prisma.comment.delete({
      where: {
        interviewId,
        id,
      },
      include: {
        users: true,
      },
    });
    return this.convertToModel(data);
  }
}
