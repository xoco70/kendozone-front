import {Category} from './category';
import {Competitor} from './competitor';
import {ChampionshipSettings} from './championship-settings';

export class Championship {
  id: number;
  tournament_id: number;
  category: Category;
  competitors: Competitor[];
  settings: ChampionshipSettings;
}
