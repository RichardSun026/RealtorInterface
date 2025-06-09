import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { SchedulerModule } from '../scheduler/scheduler.module';

@Module({
  imports: [SupabaseModule, SchedulerModule],
  controllers: [CalendarController],
  providers: [CalendarService],
  exports: [CalendarService],
})
export class CalendarModule {}
