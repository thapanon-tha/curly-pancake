import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import {
  InterviewController,
  InterviewService,
  InterviewRepository,
} from './interview';
import {
  CommentController,
  CommentService,
  CommentRepository,
} from './comment';

@Module({
  imports: [PrismaModule],
  controllers: [InterviewController, CommentController],
  providers: [
    InterviewService,
    InterviewRepository,
    CommentService,
    CommentRepository,
  ],
})
export class InterviewManagementModule {}
