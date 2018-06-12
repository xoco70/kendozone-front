import {User} from './user';
import {Venue} from './venue';
import {Competitor} from './competitor';
import {Championship} from './championship';

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
  venue: Venue;
}
