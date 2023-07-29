import { Injectable } from '@nestjs/common';
import { CreateCommentWithInterwireForm, UpdateCommentForm } from './forms';
import { CommentRepository } from './comment.repo';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepo: CommentRepository) {}
  create(payload: CreateCommentWithInterwireForm) {
    return this.commentRepo.create(payload);
  }

  findAll(interviewId: string) {
    return this.commentRepo.gets(interviewId);
  }

  findOne(interviewId: string, commentId: string) {
    return this.commentRepo.getById(interviewId, commentId);
  }

  update(interviewId: string, commentId: string, payload: UpdateCommentForm) {
    return this.commentRepo.update(interviewId, commentId, payload);
  }

  remove(interviewId: string, commentId: string) {
    return this.commentRepo.delete(interviewId, commentId);
  }
}
