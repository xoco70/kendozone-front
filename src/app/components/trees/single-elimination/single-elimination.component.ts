import {Component, Input, OnInit} from '@angular/core';
import {Championship} from '../../../models/championship';
import {FlattenPipe, GroupByPipe} from 'ngx-pipes';
import {FightersGroup} from '../../../models/fighters.group';
import {plainToClass} from 'class-transformer';
import {Team} from '../../../models/team';
import {Competitor} from '../../../models/competitor';
import {User} from '../../../models/user';

@Component({
  selector: 'app-single-elimination',
  templateUrl: './single-elimination.component.html',
  styleUrls: ['./single-elimination.component.scss'],
  providers: [GroupByPipe, FlattenPipe]
})
export class SingleEliminationComponent implements OnInit {
  @Input() championship: Championship;
  noRounds: number;
  numFighters: number;
  fighterGroups: FightersGroup[];
  firstRoundGroup: FightersGroup[];
  matches: FightersGroup[];
  private brackets = [] as any[][];
  fighters: any[];
  private groupWithoutPreliminary: FightersGroup[];

  constructor(
    private groupByPipe: GroupByPipe,
    private flattenPipe: FlattenPipe,
  ) {
  }

  ngOnInit() {
    this.fighterGroups = plainToClass(FightersGroup, this.championship.fighters_groups);
    this.firstRoundGroup = this.fighterGroups.filter(group => group.round === this.championship.settings.hasPreliminary + 1);
    this.groupWithoutPreliminary = this.fighterGroups.filter(group => group.round >= this.championship.settings.hasPreliminary + 1);
    const groupsByRound = this.groupByPipe.transform(this.groupWithoutPreliminary, 'round');

    this.numFighters = this.firstRoundGroup.length * 2;
    this.noRounds = Math.log2(this.numFighters);
    // this.matches = this.getFirstRoundFighters(groupsByRound);
    // this.fighters = this.flattenPipe.transform(this.matches);

    // console.log(this.fighterGroups);
    // console.log(this.firstRoundGroup);
    // console.log(this.groupWithoutPreliminary);
    // console.log(groupsByRound);
    // console.log(this.numFighters);
    // console.log(this.noRounds);

    for (let i = 1; i <= this.noRounds; i++) {
      // const fightersGroup = groupsByRound[i];
      this.brackets[i] = groupsByRound[i].map(group => {
        if (this.championship.category.isTeam) {
          return new Object({
            'playerA': group.teams[0] || new Team('Bye'),
            'playerB': group.teams[1] || new Team('Bye')
          });
        }
        return new Object({
          'playerA': group.competitors[0] || new Competitor(new User('Bye')),
          'playerB': group.competitors[1] || new Competitor(new User('Bye'))
        });
      });
      // console.log(groupsByRound[i]);
      console.log(this.brackets);
    }
  }


  // private function assignPositions()
  // {
  //
  //   //Variables required for figuring outing the height of the vertical connectors
  //
  //   $spaceFactor = 0.5;
  //   $playerHeightFactor = 1;
  //   foreach ($this->brackets as $roundNumber => &$round) {
  //   foreach ($round as $matchNumber => &$match) {
  //
  //     //Give teams a nicer index
  //
  //     $match['playerA'] = $match[0];
  //     $match['playerB'] = $match[1];
  //     $match['winner_id'] = $match[2];
  //
  //     unset($match[0]);
  //     unset($match[1]);
  //     unset($match[2]);
  //
  //     //Figure out the bracket positions
  //
  //     $match['matchWrapperTop'] = (((2 * $matchNumber) - 1) * (pow(2, ($roundNumber) - 1)) - 1) * (($this->matchSpacing / 2) + $this->playerWrapperHeight);
  //     $match['matchWrapperLeft'] = ($roundNumber - 1) * ($this->matchWrapperWidth + $this->roundSpacing - 1);
  //     $match['vConnectorLeft'] = floor($match['matchWrapperLeft'] + $this->matchWrapperWidth + ($this->roundSpacing / 2) - ($this->borderWidth / 2));
  //     $match['vConnectorHeight'] = ($spaceFactor * $this->matchSpacing) + ($playerHeightFactor * $this->playerWrapperHeight) + $this->borderWidth;
  //     $match['vConnectorTop'] = $match['hConnectorTop'] = $match['matchWrapperTop'] + $this->playerWrapperHeight;
  //     $match['hConnectorLeft'] = ($match['vConnectorLeft'] - ($this->roundSpacing / 2)) + 2;
  //     $match['hConnector2Left'] = $match['matchWrapperLeft'] + $this->matchWrapperWidth + ($this->roundSpacing / 2);
  //
  //     //Adjust the positions depending on the match number
  //
  //     if (!($matchNumber % 2)) {
  //       $match['hConnector2Top'] = $match['vConnectorTop'] -= ($match['vConnectorHeight'] - $this->borderWidth);
  //     } else {
  //       $match['hConnector2Top'] = $match['vConnectorTop'] + ($match['vConnectorHeight'] - $this->borderWidth);
  //     }
  //   }
  //
  //   //Update the spacing variables
  //
  //   $spaceFactor *= 2;
  //   $playerHeightFactor *= 2;
  // }
  // }


}
