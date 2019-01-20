import {Category} from './category';
import {Competitor} from './competitor';
import {ChampionshipSettings} from './championship-settings';
import {User} from './user';
import {FightersGroup} from './fighters.group';
import {Type} from 'class-transformer';
import {Team} from './team';

export class Championship {

  id: number;
  tournament_id: number;
  category_id: number;
  category: Category;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  users: User[];
  competitors: Competitor[];
  teams: Team[];
  settings: ChampionshipSettings;
  @Type(() => FightersGroup)
  fighters_groups: FightersGroup[];


  hasPreliminary() {
    return this.settings == null || this.settings.hasPreliminary;
  }

  isPlayOffType() {
    return this.settings != null && this.settings.treeType === 0;
  }

  isSingleEliminationType() {
    return this.settings != null && this.settings.treeType === 1;
  }
}


