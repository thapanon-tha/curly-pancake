import { IsString, IsUrl, IsOptional } from 'class-validator';
export class UpdateUserForm {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  imageUrl: string;
}
