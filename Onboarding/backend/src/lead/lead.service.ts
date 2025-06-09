import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class LeadService {
  constructor(private readonly supabase: SupabaseService) {}

  async findByPhone(phone: string) {
    const { data, error } = await this.supabase.client
      .from('lead')
      .select('*')
      .eq('phone', phone)
      .single();

    if (error) throw error;
    return data;
  }
}
