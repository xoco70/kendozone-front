import {Competitor} from './competitor';
import {Team} from './team';
import {Fight} from './fight';
import {Championship} from './championship';
import {Type} from 'class-transformer';

export class FightersGroup {
  id: number;
  short_id: number;
  championship: Championship;
  championship_id: number;
  round: number;
  area: number;
  order: number;
  _lft: number;
  _rgt: number;
  parent_id: number;
  @Type(() => Team)
  teams: Team[];
  @Type(() => Competitor)
  competitors: Competitor[];
  @Type(() => Fight)
  fights: Fight[];


  getFigherWithBye(): any[] {
    if (this.championship.category.isTeam) {
      return this.teamsWithBye();
    }
    return this.competitorsWithBye();
  }

  private teamsWithBye() {
    //   $teams = new Collection();
    //   $fgcs = FighterGroupTeam::where('fighters_group_id', $this->id)
    // ->with('team')
    //     ->get();
    //   foreach ($fgcs as $fgc) {
    //     $teams->push($fgc->team ?? new Team());
    //   }
    //
    //   return $teams;
    return undefined;
  }

  private competitorsWithBye() {
    //   $competitors = new Collection();
    //   $fgcs = FighterGroupCompetitor::where('fighters_group_id', $this->id)
    // ->with('competitor')
    //     ->get();
    //
    //   foreach ($fgcs as $fgc) {
    //     $competitors->push($fgc->competitor ?? new Competitor());
    //   }
    //
    //   return $competitors;
    return undefined;
  }
}
