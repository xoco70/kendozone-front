import {Category} from './category';
import {Competitor} from './competitor';
import {ChampionshipSettings} from './championship-settings';

export class Championship {
  id: number;
  tournament_id: number;
  category: Category;
  competitors: Competitor[];
  settings: ChampionshipSettings;


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


