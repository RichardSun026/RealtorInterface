import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RealtorModule } from './realtor/realtor.module';
import { CalendarModule } from './calendar/calendar.module';
import { SupabaseModule } from './supabase/supabase.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { LeadModule } from './lead/lead.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RealtorModule,
    CalendarModule,
    SupabaseModule,
    SchedulerModule,
    LeadModule,
  ],
})
export class AppModule {}
