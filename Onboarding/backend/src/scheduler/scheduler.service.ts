import { Injectable } from '@nestjs/common';

@Injectable()
export class SchedulerService {
  async scheduleFollowUps(phone: string, appointmentTime: string) {
    // Placeholder: integrate with SMS service
    console.log(`Scheduling follow-ups for ${phone} at ${appointmentTime}`);
  }
}
