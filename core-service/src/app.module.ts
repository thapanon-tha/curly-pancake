import { Module } from '@nestjs/common';
import { InterviewManagementModule } from './interview-management/interview-management.module';
import { UserManagementModule } from './user-management/user-management.module';

@Module({
  imports: [InterviewManagementModule, UserManagementModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
