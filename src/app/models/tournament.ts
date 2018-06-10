import {User} from './user';
import {Venue} from './venue';
import {ChampionshipSettings} from './championship-settings';
import {Competitor} from './competitor';

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
  competitors_count: number;
  teams_count: number;
  championships_count: number;
  championship_settings_count: number;
  competitors: Competitor[];
  championship_settings: ChampionshipSettings[];
  venue: Venue;
}
