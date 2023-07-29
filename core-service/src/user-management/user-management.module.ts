import { Module } from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { UserManagementController } from './user-management.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from './user-management.repo';

@Module({
  imports: [PrismaModule],
  controllers: [UserManagementController],
  providers: [UserManagementService, UserRepository],
})
export class UserManagementModule {}
