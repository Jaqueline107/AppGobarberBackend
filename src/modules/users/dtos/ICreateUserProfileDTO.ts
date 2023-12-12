export default interface ICreateUserProfileDTO {
  user_id: string;
  name: string;
  postal_code: string;
  address_number: number;
  full_address: string;
  latitude: number;
  longitude: number;
  contact_email?: string;
  contact_phone_number?: string;
  address_complement?: string;
}
