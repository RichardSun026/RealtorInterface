import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RealtorService } from './realtor.service';
import { CreateRealtorDto } from './dto/create-realtor.dto';

@Controller('realtor')
export class RealtorController {
  constructor(private readonly realtorService: RealtorService) {}

  @Post()
  async createRealtor(@Body() createRealtorDto: CreateRealtorDto) {
    return this.realtorService.create(createRealtorDto);
  }

  @Get(':id')
  async getRealtor(@Param('id') id: number) {
    return this.realtorService.findById(id);
  }
}
