import {User} from './user';
import {Venue} from './venue';
import {Competitor} from './competitor';
import {Championship} from './championship';

export class Tournament {
  id: number;
  user_id: number;
  user: User;
  name: string;
  slug: string;
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
  championships: Championship[];
  competitors_count: number;
  teams_count: number;
  trees_count: number;
  championship_settings_count: number;
  competitors: Competitor[];
  categoriesSelected: number[];


  isTest() {
    return true;
  }
}
