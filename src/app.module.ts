import { Module } from '@nestjs/common';
import { InterviewManagementModule } from 'src/interview-management/interview-management.module';
import { UserManagementModule } from 'src/user-management/user-management.module';

@Module({
  imports: [InterviewManagementModule, UserManagementModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
