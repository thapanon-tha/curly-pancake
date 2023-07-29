import { Injectable } from '@nestjs/common';
import {
  CreateInterviewForm,
  UpdateInterviewForm,
  InterviewPageOptionsParamForm,
} from './forms';
import { InterviewRepository } from './interview.repo';

@Injectable()
export class InterviewService {
  constructor(private readonly interviewRepo: InterviewRepository) {}
  create(payload: CreateInterviewForm) {
    payload;
    return this.interviewRepo.create(payload);
  }

  findAll(queryOption: InterviewPageOptionsParamForm) {
    return this.interviewRepo.gets(queryOption);
  }

  findOne(id: string) {
    return this.interviewRepo.getById(id);
  }

  update(id: string, payload: UpdateInterviewForm) {
    return this.interviewRepo.update(id, payload);
  }

  delete(id: string) {
    return this.interviewRepo.delete(id);
  }
}
