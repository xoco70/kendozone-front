import {User} from './user';
import {Venue} from './venue';

export class Tournament {
  id: number;
  name: string;
  slug: string;
  user: User;
  date: string;
  dateIni: string;
  dateFin: string;
  registerDateLimit: string;
  sport: number;
  promoter: string;
  host_organization: string;
  technical_assistance: string;
  rule_id: number;
  type: number;
  venue_id: number;
  venue: Venue;
  level_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  numCompetitors: number;
}
