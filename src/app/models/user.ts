export class User {
  constructor(name: string) {
    this.name = name;
  }

  id: number;
  name: string;
  email: string;
  password: string;
  slug: string;
  city: string;
  latitude: number;
  longitude: number;
  country_id: number;
  gender: number;
  avatar: string;
}
