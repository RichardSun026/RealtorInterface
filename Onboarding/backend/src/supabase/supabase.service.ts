import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  public client: SupabaseClient;

  constructor() {
    this.client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
    );
  }

  async insertCredentials(realtorId: number, tokens: any) {
    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);
    return this.client.from('google_credentials').upsert({
      realtor_id: realtorId,
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      token_expires: expiresAt.toISOString(),
    });
  }

  async updateCredentials(realtorId: number, tokens: any) {
    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000);
    return this.client
      .from('google_credentials')
      .update({
        access_token: tokens.access_token,
        token_expires: expiresAt.toISOString(),
      })
      .eq('realtor_id', realtorId);
  }

  async getCredentials(realtorId: number) {
    const { data } = await this.client
      .from('google_credentials')
      .select('*')
      .eq('realtor_id', realtorId)
      .single();
    return data;
  }

  async upsertEvent(realtorId: number, eventId: string, eventData: any) {
    return this.client.from('google_calendar_events').upsert({
      realtor_id: realtorId,
      google_event_id: eventId,
      summary: eventData.summary,
      description: eventData.description,
      start_time: eventData.start,
      end_time: eventData.end,
    });
  }

  async removeEvent(eventId: string) {
    return this.client.from('google_calendar_events').delete().eq('google_event_id', eventId);
  }

  async query(path: string) {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/${path}`, {
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY!}`,
      },
    });
    return response.json();
  }
}
