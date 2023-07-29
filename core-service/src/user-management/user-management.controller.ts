import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { CreateUserForm, UpdateUserForm } from './forms';
import { IdParamForm } from 'src/common/forms';

@Controller('users')
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @Post()
  create(@Body() payload: CreateUserForm) {
    return this.userManagementService.create(payload);
  }

  @Get()
  findAll() {
    return this.userManagementService.findAll();
  }

  @Get('/:id')
  findOne(@Param() { id }: IdParamForm) {
    return this.userManagementService.findOne(id);
  }

  @Put('/:id')
  update(@Param() { id }: IdParamForm, @Body() payload: UpdateUserForm) {
    return this.userManagementService.update(id, payload);
  }
}
