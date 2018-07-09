import {Tournament} from '../models/tournament';

export const TOURNAMENT: Tournament = {
  categoriesSelected: undefined,
  championship_settings_count: 0,
  championships: undefined,
  competitors: undefined,
  competitors_count: 0,
  dateFin: '',
  date: '',
  dateIni: '',
  host_organization: '',
  id: 0,
  level_id: 0,
  name: '',
  promoter: '',
  registerDateLimit: '',
  rule_id: 0,
  slug: '',
  sport: 0,
  teams_count: 0,
  technical_assistance: '',
  trees_count: 0,
  type: 0,
  user: undefined,
  user_id: 0,
  venue: undefined,
  venue_id: 0,
  isTest(): boolean {
    return false;
  }
};
