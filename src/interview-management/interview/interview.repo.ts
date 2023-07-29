import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Interview as InterviewPrisma } from '@prisma/client';
import { InterviewModel, InterviewStatus } from './models';
import {
  CreateInterviewForm,
  InterviewPageOptionsParamForm,
  UpdateInterviewForm,
} from './forms';
import { UserModel } from 'src/user-management/models';

const interviewWithUser = Prisma.validator<Prisma.InterviewArgs>()({
  include: {
    users: true,
  },
});

type InterviewWithUser = Prisma.InterviewGetPayload<typeof interviewWithUser>;

@Injectable()
export class InterviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  convertToModel(
    interview: InterviewPrisma | InterviewWithUser,
  ): InterviewModel {
    const users =
      'users' in interview
        ? new UserModel({
            id: interview.users['id'],
            imageUrl: interview.users['imageUrl'],
            name: interview.users['name'],
          })
        : null;

    return new InterviewModel({
      id: interview.id,
      title: interview.title,
      message: interview.message,
      createdAt: interview.createdAt,
      updatedAt: interview.updatedAt,
      status: InterviewStatus[interview.status],
      creatorId: interview.creatorId,
      creator: users,
    });
  }

  async gets(
    queryOption: InterviewPageOptionsParamForm,
  ): Promise<InterviewModel[]> {
    const data = await this.prisma.interview.findMany({
      where: {
        ...(queryOption.status
          ? {
              status: {
                in: queryOption.status,
              },
            }
          : {}),
      },
      include: {
        users: true,
      },
      orderBy: {
        ...(queryOption.sortBy
          ? { [queryOption.sortBy]: queryOption.sortOrder }
          : { createdAt: 'desc' }),
      },
      skip: queryOption.skip,
      take: queryOption.take,
    });
    return data.map((e) => this.convertToModel(e));
  }

  async getById(id: string): Promise<InterviewModel> {
    const data = await this.prisma.interview.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        users: true,
      },
    });
    return this.convertToModel(data);
  }

  async create(payload: CreateInterviewForm): Promise<InterviewModel> {
    const data = await this.prisma.interview.create({
      data: {
        title: payload.title,
        message: payload.message,
        ...(payload.status ? { status: InterviewStatus[payload.status] } : {}),
        creatorId: payload.creatorId,
      },
      include: {
        users: true,
      },
    });
    return this.convertToModel(data);
  }

  async update(
    id: string,
    payload: UpdateInterviewForm,
  ): Promise<InterviewModel> {
    const data = await this.prisma.interview.update({
      data: {
        ...(payload.title ? { title: payload.title } : {}),
        ...(payload.message ? { message: payload.message } : {}),
        ...(payload.status ? { status: InterviewStatus[payload.status] } : {}),
        ...(payload.creatorId ? { creatorId: payload.creatorId } : {}),
      },
      include: {
        users: true,
      },
      where: {
        id: id,
      },
    });
    return this.convertToModel(data);
  }

  async delete(id: string): Promise<InterviewModel> {
    const data = await this.prisma.interview.delete({
      where: {
        id: id,
      },
      include: {
        users: true,
      },
    });
    return this.convertToModel(data);
  }
}
