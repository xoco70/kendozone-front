import {Competitor} from './competitor';
import {Team} from './team';
import {Fight} from './fight';

export class FightersGroup {
  id: number;
  short_id: number;
  championship_id: number;
  round: number;
  area: number;
  order: number;
  _lft: number;
  _rgt: number;
  parent_id: number;
  teams: Team[];
  competitors: Competitor[];
  fights: Fight[];
}
