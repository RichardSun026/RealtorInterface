import { Controller, Get, Param } from '@nestjs/common';
import { LeadService } from './lead.service';

@Controller('userreport')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Get(':phone')
  async getByPhone(@Param('phone') phone: string) {
    return this.leadService.findByPhone(phone);
  }
}
