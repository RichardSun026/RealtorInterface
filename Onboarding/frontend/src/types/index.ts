export interface RealtorData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  website?: string;
}

export interface RealtorResponse {
  realtor_id: number;
  f_name: string;
  e_name: string;
  phone: string;
  email: string;
  website_url?: string;
  uuid: string;
}
