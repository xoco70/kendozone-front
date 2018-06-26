import {User} from './user';

export class Competitor {
  constructor(user: User) {
    this.user = user;
  }

  id: number;
  short_id: number;
  championship_id: number;
  user_id: number;
  user: User;
  confirmed: boolean;
}
