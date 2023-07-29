import { IsUUID } from 'class-validator';
import { IdParamForm } from 'src/common/forms';

export class CommentParamForm extends IdParamForm {
  @IsUUID()
  commentId: string;
}
