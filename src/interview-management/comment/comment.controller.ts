import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CommentParamForm,
  CreateCommentForm,
  CreateCommentWithInterwireForm,
  UpdateCommentForm,
} from './forms';
import { IdParamForm } from 'src/common/forms';

@Controller('interviews/:id/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Param() { id }: IdParamForm, @Body() payload: CreateCommentForm) {
    const fullPayload = new CreateCommentWithInterwireForm({
      message: payload.message,
      userId: payload.userId,
      interviewId: id,
    });

    return this.commentService.create(fullPayload);
  }

  @Get()
  findAll(@Param() { id }: IdParamForm) {
    return this.commentService.findAll(id);
  }

  @Get('/:id')
  findOne(@Param() { id, commentId }: CommentParamForm) {
    return this.commentService.findOne(id, commentId);
  }

  @Put(':commentId')
  update(
    @Param() { id, commentId }: CommentParamForm,
    @Body() payload: UpdateCommentForm,
  ) {
    return this.commentService.update(id, commentId, payload);
  }

  @Delete(':commentId')
  remove(@Param() { id, commentId }: CommentParamForm) {
    return this.commentService.remove(id, commentId);
  }
}
