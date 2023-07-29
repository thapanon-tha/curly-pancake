import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateUserForm {
  @IsString()
  name: string;

  @IsOptional()
  @IsUrl()
  imageUrl =
    'https://e7.pngegg.com/pngimages/304/275/png-clipart-user-profile-computer-icons-profile-miscellaneous-logo.png';
}
