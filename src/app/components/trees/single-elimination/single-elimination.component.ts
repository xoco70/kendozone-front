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
  matchWrapperWidth = 150;
  private brackets = [] as any[][];
  private groupWithoutPreliminary: FightersGroup[];

  constructor(
    private groupByPipe: GroupByPipe,
  ) {
  }

  ngOnInit() {
    this.fighterGroups = plainToClass(FightersGroup, this.championship.fighters_groups);
    this.firstRoundGroup = this.fighterGroups.filter(group => group.round === this.championship.settings.hasPreliminary + 1);
    this.groupWithoutPreliminary = this.fighterGroups.filter(group => group.round >= this.championship.settings.hasPreliminary + 1);
    const groupsByRound = this.groupByPipe.transform(this.groupWithoutPreliminary, 'round');

    this.numFighters = this.firstRoundGroup.length * 2;
    this.noRounds = Math.log2(this.numFighters);

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
    }
    // console.log(this.brackets);
    this.assignPositions();
  }

  assignPositions() {
    let spaceFactor = 0.5;
    let playerHeightFactor = 1;
    const playerWrapperHeight = 30;

    const roundSpacing = 40;
    const matchSpacing = 42;
    const borderWidth = 3;

    this.brackets.forEach((round, roundNumber) => {
      round.forEach((match, matchNumber) => {
        matchNumber = matchNumber + 1; // matchNumber should begin with 1, not 0
        // console.log(roundNumber);
        // console.log(matchNumber);
        // console.log(match[0]);
        // console.log(match[1]);
        // console.log(match[2]);
        // match['winner_id'] = match[2];

        // hConnector2Top:-72
        // hConnectorTop:-21
        // matchWrapperTop:-51
        // vConnectorTop:-72
        // console.log((2 * matchNumber) - 1);
        // console.log(Math.pow( 2,roundNumber - 1));
        // console.log(((matchSpacing / 2) + playerWrapperHeight));
        // console.log('-------');
        match['matchWrapperTop'] = (((2 * matchNumber) - 1) * (Math.pow( 2,roundNumber - 1)) - 1) * ((matchSpacing / 2) + playerWrapperHeight);
        match['matchWrapperLeft'] = (roundNumber - 1) * (this.matchWrapperWidth + roundSpacing - 1);
        match['vConnectorLeft'] = Math.floor(match['matchWrapperLeft'] + this.matchWrapperWidth + (roundSpacing / 2) - (borderWidth / 2));
        match['vConnectorHeight'] = (spaceFactor * matchSpacing) + (playerHeightFactor * playerWrapperHeight) + borderWidth;
        match['vConnectorTop'] = match['hConnectorTop'] = match['matchWrapperTop'] + playerWrapperHeight;
        match['hConnectorLeft'] = (match['vConnectorLeft'] - (roundSpacing / 2)) + 2;
        match['hConnector2Left'] = match['matchWrapperLeft'] + this.matchWrapperWidth + (roundSpacing / 2);
        //
        // // Adjust the positions depending on the match number
        //
        if (!(matchNumber % 2)) {
          match['hConnector2Top'] = match['vConnectorTop'] -= (match['vConnectorHeight'] - borderWidth);
        } else {
          match['hConnector2Top'] = match['vConnectorTop'] + (match['vConnectorHeight'] - borderWidth);
        }
      });
      spaceFactor *= 2;
      playerHeightFactor *= 2;
      return;
    });
    console.log(this.brackets);
  }
}
