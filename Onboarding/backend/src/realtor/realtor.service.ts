import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateRealtorDto } from './dto/create-realtor.dto';

@Injectable()
export class RealtorService {
  constructor(private readonly supabase: SupabaseService) {}

  async create(data: CreateRealtorDto) {
    const { data: realtor, error } = await this.supabase.client
      .from('realtor')
      .insert({
        f_name: data.firstName,
        e_name: data.lastName,
        phone: data.phone,
        email: data.email,
        website_url: data.website,
      })
      .select()
      .single();

    if (error) throw error;
    return realtor;
  }

  async findById(id: number) {
    const { data, error } = await this.supabase.client
      .from('realtor')
      .select('*')
      .eq('realtor_id', id)
      .single();

    if (error) throw error;
    return data;
  }
}
