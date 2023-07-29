import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { InterviewService } from './interview.service';
import { CreateInterviewForm, UpdateInterviewForm } from './forms';
import { IdParamForm } from 'src/common/forms';

@Controller('interviews')
export class InterviewController {
  constructor(private readonly interviewService: InterviewService) {}

  @Post()
  create(@Body() payload: CreateInterviewForm) {
    return this.interviewService.create(payload);
  }

  @Get()
  findAll() {
    return this.interviewService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: IdParamForm) {
    return this.interviewService.findOne(id);
  }

  @Put(':id')
  update(@Param() { id }: IdParamForm, @Body() payload: UpdateInterviewForm) {
    return this.interviewService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param() { id }: IdParamForm) {
    return this.interviewService.delete(id);
  }
}
