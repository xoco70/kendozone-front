import {Component, Input, OnInit} from '@angular/core';
import {Championship} from '../../../models/championship';
import {FlattenPipe, GroupByPipe} from 'ngx-pipes';
import {User} from '../../../models/user';
import {Competitor} from '../../../models/competitor';
import {Team} from '../../../models/team';
import {FightersGroup} from '../../../models/fighters.group';
import {plainToClass} from 'class-transformer';

@Component({
  selector: 'app-single-elimination',
  templateUrl: './single-elimination.component.html',
  styleUrls: ['./single-elimination.component.scss'],
  providers: [GroupByPipe, FlattenPipe]
})
export class SingleEliminationComponent implements OnInit {
  @Input() championship: Championship;
  noRounds: number;
  fighterGroups: FightersGroup[];
  firstRoundGroup: FightersGroup[];
  matches: FightersGroup[];
  private brackets = [] as any[][];
  fighters: any[];

  constructor(
    private groupByPipe: GroupByPipe,
    private flattenPipe: FlattenPipe,
  ) {
  }

  ngOnInit() {
    this.fighterGroups = plainToClass(FightersGroup, this.championship.fighters_groups);
    this.firstRoundGroup = this.fighterGroups.filter(h => h.round >= this.championship.settings.hasPreliminary + 1);
    console.log(this.firstRoundGroup);
    const groupByRound = this.groupByPipe.transform(this.firstRoundGroup, 'round'); // Returns: "oof"
    const brackets = [];

    if (this.firstRoundGroup.length > 0) {
      this.matches = this.getFirstRoundFighters(groupByRound);
      console.log(this.matches);
      this.fighters = this.flattenPipe.transform(this.matches);
      console.log(this.fighters);
      // Calculate the size of the first full round -
      // for example if you have 5 fighters, then the first full round will consist of 4 fighters

      this.noRounds = Math.log(this.fighters.length);
      let roundNumber = 1;
      // Group 2 fighters into a match
      // $matches = array_chunk($fighters, 2); // Use less
      //
      // If there's already a match in the match array, then that means the next round is round 2, so increase the round number
      if (brackets && brackets.length) {
        roundNumber++;
      }

      // Create the first full round of fighters, some may be blank if waiting on the results of a previous round
      for (let i = 0; i < this.matches.length; i++) {
        brackets[i + 1] = [];
        brackets[roundNumber][i + 1] = this.matches[i];
      }
      console.log(brackets);
      // Create the result of the empty rows for this tournament
      this.assignFightersToBracket(roundNumber, this.championship.settings.hasPreliminary);
      // $this->assignPositions();
      //
      // if ($this->numFighters >= $this->championship->getGroupSize() * 2) {
      //   $this->brackets[$this->noRounds][2]['matchWrapperTop'] = $this->brackets[$this->noRounds][1]['matchWrapperTop'] + 100;
      // }

    }
  }

  private assignFightersToBracket(numRound: number, hasPreliminary: number) {
    for (let roundNumber = numRound; roundNumber <= this.noRounds; roundNumber++) {
      const groupsByRound = this.fighterGroups.filter(h => h.round >= hasPreliminary + roundNumber);
      console.log(groupsByRound);
      for (let matchNumber = 1; matchNumber <= this.fighters.length / Math.pow(roundNumber, 2); matchNumber++) {
        const fight = groupsByRound[matchNumber - 1].fights;
        console.log(fight);
        // const fighter1 = fight.fighter1;
        // const fighter2 = fight.fighter2;
        // const winnerId = fight.winner_id;
        // this.brackets[roundNumber][matchNumber] = [fighter1, fighter2, winnerId];
      }
    }

    if (this.matches.length > this.championship.settings.preliminaryGroupSize * 2) {
      const lastRound = this.noRounds;
      const lastMatch = this;
    }

    // if ($this - > numFighters >= $this - > championship - > getGroupSize() * 2) {
    //   $lastRound = $this - > noRounds;
    //   $lastMatch = $this - > numFighters / pow(2, $roundNumber) + 1;
    //   $groupsByRound = $this - > groupsByRound - > get(intval($this - > noRounds));
    //   $group = $groupsByRound[$lastMatch];
    //   $fight = $group - > fights[0];
    //   $fighter1 = $fight - > fighter1;
    //   $fighter2 = $fight - > fighter2;
    //   $winnerId = $fight - > winner_id;
    //   $this - > brackets[$lastRound][$lastMatch + 1];
    //   = [$fighter1, $fighter2, $winnerId];
    // }
  }

  private getFirstRoundFighters(groupByRound) {
    let firstRoundName = [] as FightersGroup[];
    firstRoundName = groupByRound[1].map((group) => {
      if (group.teams.length > 0) {
        const team1 = plainToClass(Team, group.teams[0]) || new Team('Bye');
        const team2 = plainToClass(Team, group.teams[1]) || new Team('Bye');
        return [team1, team2];
      }

      if (group.competitors.length > 0) {
        const comp1 = plainToClass(Competitor, group.competitors[0]) || new Competitor(new User('Bye'));
        const comp2 = plainToClass(Competitor, group.competitors[1]) || new Competitor(new User('Bye'));
        return [comp1, comp2];
      }
      return null;
    });
    return firstRoundName;
  }
}
