import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [StudentsModule],
  controllers: [HealthController],
})
export class AppModule {}
